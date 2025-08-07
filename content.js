console.log('通貨換算拡張機能が読み込まれました！');

document.addEventListener('mouseup', function() {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText && isNumeric(selectedText)) {
    console.log('選択された数字:', selectedText);
    convertCurrency(selectedText);
  }
});

function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function convertCurrency(number) {
  // 設定と為替レートを取得
  chrome.storage.sync.get(['fromCurrency', 'toCurrency', 'exchangeRates'], function(result) {
    if (chrome.runtime.lastError) {
      console.error('Storage error:', chrome.runtime.lastError);
      showTooltip('ストレージエラーが発生しました');
      return;
    }
    
    const fromCurrency = result.fromCurrency || 'USD';
    const toCurrency = result.toCurrency || 'JPY';
    const rates = result.exchangeRates;
    
    console.log('設定:', fromCurrency, 'から', toCurrency);
    console.log('レートデータ:', rates);
    
    if (!rates) {
      showTooltip('為替レートがありません。拡張機能から「レート更新」をクリックしてください。');
      return;
    }
    
    const num = parseFloat(number);
    let convertedAmount;
    
    try {
      if (fromCurrency === 'USD') {
        // USDから他の通貨への換算
        convertedAmount = num * rates[toCurrency];
      } else if (toCurrency === 'USD') {
        // 他の通貨からUSDへの換算
        convertedAmount = num / rates[fromCurrency];
      } else {
        // USD以外同士の換算（USDを経由）
        const usdAmount = num / rates[fromCurrency];
        convertedAmount = usdAmount * rates[toCurrency];
      }
      
      const message = `${num} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
      console.log('換算結果:', message);
      showTooltip(message);
      
    } catch (error) {
      console.error('換算エラー:', error);
      showTooltip('換算エラーが発生しました');
    }
  });
}

function showTooltip(message) {
  // 既存のツールチップを削除
  const existing = document.getElementById('currency-tooltip');
  if (existing) {
    existing.remove();
  }
  
  // 選択範囲の位置を取得
  const selection = window.getSelection();
  let tooltipX = 0;
  let tooltipY = 0;
  
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    
    if (rect.width > 0 && rect.height > 0) {
      // 選択範囲の右上に表示
      tooltipX = rect.right + window.scrollX + 10;
      tooltipY = rect.top + window.scrollY - 35;
    } else {
      // フォールバック：画面右上
      tooltipX = window.innerWidth - 250;
      tooltipY = 20;
    }
  } else {
    tooltipX = window.innerWidth - 250;
    tooltipY = 20;
  }
  
  // 新しいツールチップを作成
  const tooltip = document.createElement('div');
  tooltip.id = 'currency-tooltip';
  tooltip.innerHTML = `
    ${message}
    <div style="
      position: absolute;
      top: 100%;
      left: 20px;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #333;
    "></div>
  `;
  
  tooltip.style.cssText = `
    position: absolute;
    left: ${tooltipX}px;
    top: ${tooltipY}px;
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 13px;
    z-index: 999999;
    font-family: Arial, sans-serif;
    white-space: nowrap;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    pointer-events: none;
  `;
  
  document.body.appendChild(tooltip);
  
  // 画面からはみ出さないように調整
  const tooltipRect = tooltip.getBoundingClientRect();
  if (tooltipRect.right > window.innerWidth) {
    tooltip.style.left = (tooltipX - tooltipRect.width - 20) + 'px';
  }
  if (tooltipRect.top < 0) {
    tooltip.style.top = (tooltipY + 40) + 'px';
  }
  
  // 3秒後に削除
  setTimeout(() => {
    if (tooltip.parentNode) {
      tooltip.parentNode.removeChild(tooltip);
    }
  }, 3000);
  
  // クリックしたら即座に削除
  document.addEventListener('click', function removeTooltip() {
    if (tooltip.parentNode) {
      tooltip.parentNode.removeChild(tooltip);
    }
    document.removeEventListener('click', removeTooltip);
  });
}