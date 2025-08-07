# 💱 Currency Converter Chrome Extension

リアルタイム通貨換算Chrome拡張機能 - Webページ上の数字を選択するだけで瞬時に他の通貨に換算

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Chrome](https://img.shields.io/badge/chrome-extension-yellow.svg)

## ✨ 特徴

- 🖱️ **ワンクリック換算**: 数字を選択するだけで自動変換
- 📍 **スマート表示**: 選択した位置の近くに結果を表示
- 🌐 **多通貨対応**: USD, JPY, EUR, GBP, CNY, KRW
- ⏰ **自動更新**: 1時間ごとに最新の為替レートを取得
- ⚙️ **カスタマイズ**: 好きな通貨ペアで設定可能
- 🛡️ **プライバシー保護**: ローカル処理、閲覧履歴は非収集

## 🎬 デモ

海外のオンラインショッピング、投資情報の確認、ニュース記事の金額など、様々な場面で活用できます。

```
選択: $299
表示: 299 USD = 44,850 JPY
```

## 🚀 クイックスタート

### 1. ダウンロード

```bash
# GitHubからクローン
git clone https://github.com/mocchan_f/currency-converter-extension.git
```

または [Releases](https://github.com/mocchan_f/currency-converter-extension/releases) からZIPファイルをダウンロード

### 2. Chrome拡張機能として追加

1. `chrome://extensions/` を開く
2. 「デベロッパーモード」を有効化
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. `src` フォルダを選択

### 3. 初期設定

1. 拡張機能アイコンをクリック
2. 「レート更新」ボタンを押す
3. 好きな通貨ペアを選択して「設定を保存」

## 📖 詳細な使い方

完全なインストール・設定ガイドは [docs/installation-guide.md](docs/installation-guide.md) をご覧ください。

## 💻 対応環境

- **ブラウザ**: Google Chrome, Microsoft Edge, その他Chromium系ブラウザ
- **OS**: Windows, macOS, Linux
- **必要な権限**: storage, activeTab, alarms

## 🌍 対応通貨

| 通貨コード | 通貨名 | 記号 |
|----------|--------|------|
| USD | アメリカドル | $ |
| JPY | 日本円 | ¥ |
| EUR | ユーロ | € |
| GBP | イギリスポンド | £ |
| CNY | 中国人民元 | ¥ |
| KRW | 韓国ウォン | ₩ |

## 🛠️ 開発

### ファイル構成

```
src/
├── manifest.json          # 拡張機能設定
├── popup.html             # 設定画面UI
├── popup.js               # 設定画面ロジック
├── content.js             # Webページ操作
├── background.js          # バックグラウンド処理
└── icons/                 # アイコンファイル
    ├── icon16.png
    ├── icon32.png
    ├── icon48.png
    └── icon128.png
```

### API

為替レート情報は [ExchangeRate-API](https://api.exchangerate-api.com/) を使用しています。

### カスタマイズ

新しい通貨を追加したい場合は、`popup.html` の `<select>` オプションと `content.js` の変換ロジックを更新してください。

## 🐛 トラブルシューティング

### よくある問題

**Q: 「為替レートがありません」と表示される**
A: 拡張機能アイコンから「レート更新」を実行してください

**Q: 換算結果が表示されない**  
A: 数字のみを選択し、文字や記号は含めないでください

**Q: レート更新がエラーになる**
A: インターネット接続を確認し、しばらく待ってから再試行してください

その他の問題は [Issues](https://github.com/YOUR_USERNAME/currency-converter-extension/issues) で報告してください。

## 🤝 貢献

バグ報告、機能要望、プルリクエストを歓迎します！

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📜 ライセンス

このプロジェクトは [MIT License](LICENSE) のもとで公開されています。

## 🙏 謝辞

- [ExchangeRate-API](https://api.exchangerate-api.com/) - 為替レートデータの提供
- Chrome Extension開発コミュニティ

## 📞 サポート

- 📧 問題や質問: [Issues](https://github.com/YOUR_USERNAME/currency-converter-extension/issues)
- 💬 機能要望: [Discussions](https://github.com/YOUR_USERNAME/currency-converter-extension/discussions)

---

⭐ このプロジェクトが役に立ったら、スターをつけてください！

## 📊 統計

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/currency-converter-extension)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/currency-converter-extension)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/currency-converter-extension)