# チーム年間予算消化アプリ (Team Budget App)

海外取引や為替リスクを考慮した**「外貨対応・年間予算消化管理システム」**です。  
アジャイル開発アプローチを採用しており、本リポジトリではファーストフェーズとして完成した**「ユーザー認証・管理基盤（MVP）」**をクラウド環境へ先行デプロイして公開しています。

---

## 📌 プロジェクト概要・開発フェーズ

- **プロジェクト最終形態**:  
  複数通貨（USD/JPYなど）に対応し、リアルタイム為替レート連携やチームごとの年間予算消化推移を可視化・分析するWebアプリケーション。
- **現在のフェーズ（Phase 1 完了）**:  
  セキュリティとデータ整合性の基盤となる**「ユーザー認証・アカウント管理機能」**をフルスタック（React + Spring Boot + PostgreSQL）で構築し、コンテナ（Docker）を用いてクラウド本番環境へデプロイ完了。

---

## 🌐 公開環境 (Render / Neon)

クラウド本番環境にて実際に稼働しています。以下のURLから動作をご確認いただけます。

- **Web アプリケーション (Frontend)**:  
  [https://team-budget-frontend.onrender.com](https://team-budget-frontend.onrender.com)
- **API サーバー (Backend)**:  
  [https://team-budget-app.onrender.com](https://team-budget-app.onrender.com)

> ※無料プランの仕様上、初回アクセス時はサーバーのスリープ解除により応答に50秒ほどかかる場合があります。

---

## 🛠 技術スタック

### フロントエンド (front-end)

- **ライブラリ / フレームワーク**: React 19 (Create React App)
- **ルーティング**: React Router v7 (`react-router-dom`)
- **HTTP 通信**: Fetch API / RESTful API 連携
- **認証管理**: LocalStorage によるJWTトークン・セッション管理
- **ホスティング**: Render (Static Site)

### バックエンド (back-end / team-budget-backend)

- **フレームワーク**: Spring Boot 3
- **言語**: Java 17+
- **ビルドツール**: Maven
- **コンテナ技術**: Docker (Multi-stage build による軽量化)
- **ホスティング**: Render (Web Service / Docker Runtime)

### データベース & インフラ

- **データベース**: PostgreSQL
- **クラウドDB**: Neon (Serverless PostgreSQL)
- **構成管理**: Git / GitHub（機密情報は環境変数で安全に管理）

---

## 💡 現在実装済みの機能 (Phase 1)

1. **ユーザー認証・認可**
   - 新規アカウント登録機能
   - ログイン認証およびJWTトークンの発行・永続化
   - ログアウト機能
2. **ユーザー管理 (CRUD)**
   - 登録済みユーザーの一覧取得・表示
   - ユーザープロファイル情報の編集・更新
3. **クラウドインフラ構築**
   - Dockerfile による再現性の高い実行環境構築
   - クラウドDB（Neon）とバックエンドAPIの本番接続

---

## 🗺 今後のロードマップ (Phase 2 以降)

- [ ] **外貨レート連携**: 外部為替APIと連携したリアルタイム/月次為替換算機能
- [ ] **予算登録・実績管理**: 部門・チーム別の年間予算設定と支出実績のトラッキング
- [ ] **ダッシュボード可視化**: 消化率や将来予測チャートの描画
- [ ] **権限ロール設計**: 管理者・一般ユーザーに応じた閲覧/承認フロー

---

## 📁 ディレクトリ構造

```text
team-budget-app/
├── back-end/
│   └── team-budget-backend/     # Spring Boot API プロジェクト
│       ├── src/                 # バックエンドソースコード
│       ├── pom.xml              # Maven 依存関係定義
│       └── Dockerfile           # 本番コンテナビルド定義
├── front-end/                   # React フロントエンドプロジェクト
│   ├── src/                     # コンポーネント・画面ロジック
│   │   ├── components/          # 画面共通パーツ (UserForm等)
│   │   ├── services/            # API通信モジュール (apiClient.js等)
│   │   └── Login.jsx            # ログイン画面
│   ├── package.json             # フロントエンド依存関係定義
│   └── public/
└── README.md                    # 本ドキュメント
```
