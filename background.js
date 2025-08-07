// 拡張機能がインストールされた時、または起動時に実行
chrome.runtime.onInstalled.addListener(function() {
  console.log('通貨換算拡張機能がインストールされました');
    
  // 初回はすぐにレートを更新
  updateExchangeRates();
    
  // デフォルト設定
  chrome.storage.sync.get(['fromCurrency', 'toCurrency'], function(result) {
    if (!result.fromCurrency) {
      chrome.storage.sync.set({
        fromCurrency: 'USD',
        toCurrency: 'JPY'
      });
    }
  });
});
  
// ブラウザ起動時にも更新
chrome.runtime.onStartup.addListener(function() {
  console.log('ブラウザが起動されました - レートを更新');
  updateExchangeRates();
});
  
// 定期的にレートを更新（1時間ごと）
chrome.alarms.create('updateRates', {
  delayInMinutes: 1,    // 1分後に最初の更新
  periodInMinutes: 60   // その後1時間ごと
});
  
chrome.alarms.onAlarm.addListener(function(alarm) {
  if (alarm.name === 'updateRates') {
    console.log('定期レート更新を実行');
    updateExchangeRates();
  }
});
  
// 為替レート更新関数
function updateExchangeRates() {
  console.log('為替レートを更新中...');
    
  fetch('https://api.exchangerate-api.com/v4/latest/USD')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('レート更新成功:', data.rates);
      chrome.storage.sync.set({
        exchangeRates: data.rates,
        lastUpdated: new Date().toISOString()
      }, function() {
        console.log('レートをストレージに保存しました');
      });
    })
    .catch(error => {
      console.error('レート更新エラー:', error);
    });
}
  
// ポップアップからの手動更新要求に対応
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'updateRates') {
    console.log('手動レート更新要求を受信');
    updateExchangeRates();
    sendResponse({success: true});
  }
});