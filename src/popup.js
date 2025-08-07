document.addEventListener('DOMContentLoaded', function() {
  // 保存された設定を読み込み
  chrome.storage.sync.get(['fromCurrency', 'toCurrency'], function(result) {
    if (result.fromCurrency) {
      document.getElementById('fromCurrency').value = result.fromCurrency;
    }
    if (result.toCurrency) {
      document.getElementById('toCurrency').value = result.toCurrency;
    }
  });
  
  // 最後のレート更新時間を表示
  chrome.storage.sync.get(['lastUpdated'], function(result) {
    if (result.lastUpdated) {
      const date = new Date(result.lastUpdated);
      const statusEl = document.getElementById('status');
      statusEl.textContent = `最終更新: ${date.toLocaleString()}`;
      statusEl.className = 'success';
    }
  });
});

// 設定保存
document.getElementById('saveSettings').addEventListener('click', function() {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  
  chrome.storage.sync.set({
    fromCurrency: fromCurrency,
    toCurrency: toCurrency
  }, function() {
    const statusEl = document.getElementById('status');
    statusEl.textContent = '設定を保存しました！';
    statusEl.className = 'success';
    setTimeout(() => {
      statusEl.textContent = '';
      statusEl.className = '';
    }, 2000);
  });
});

// レート更新
document.getElementById('updateRates').addEventListener('click', function() {
  const statusEl = document.getElementById('status');
  statusEl.textContent = 'レートを更新中...';
  statusEl.className = '';
  
  // バックグラウンドスクリプトに更新を依頼
  chrome.runtime.sendMessage({action: 'updateRates'}, function() {
    if (chrome.runtime.lastError) {
      console.error('メッセージ送信エラー:', chrome.runtime.lastError);
      statusEl.textContent = 'バックグラウンド通信エラー';
      statusEl.className = 'error';
      return;
    }
    
    // 更新完了を待つ（少し待ってからストレージをチェック）
    setTimeout(() => {
      chrome.storage.sync.get(['lastUpdated'], function(result) {
        if (result.lastUpdated) {
          const date = new Date(result.lastUpdated);
          statusEl.textContent = 'レートを更新しました！';
          statusEl.className = 'success';
          setTimeout(() => {
            statusEl.textContent = `最終更新: ${date.toLocaleString()}`;
          }, 2000);
        }
      });
    }, 1000);
  });
});