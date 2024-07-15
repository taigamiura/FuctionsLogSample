# Firebase Cloud Function: Hello World

このプロジェクトは、Firebase Cloud Functionsを使用してHTTPリクエストを処理し、様々なログレベルでメッセージを記録するサンプルです。リクエストの内容に応じて異なるステータスコードとメッセージをレスポンスとして返します。

## プロジェクトの構成

- `index.js`: Firebase Cloud Functionのエントリーポイント。HTTPリクエストを受け取り、クエリパラメータに応じて異なるログメッセージを記録し、適切なレスポンスを返します。

## セットアップ手順

### 1. Firebase CLIのインストール
Firebase CLIをインストールしていない場合は、以下のコマンドを実行してインストールします。
```sh
npm install -g firebase-tools
```

### 2. Firebaseプロジェクトの作成
Firebaseコンソールで新しいプロジェクトを作成します。既存のプロジェクトを使用することもできます。

### 3. Firebaseプロジェクトへのログイン
Firebase CLIを使用してFirebaseプロジェクトにログインします。
```sh
firebase login
```

### 4. プロジェクトの初期化
プロジェクトディレクトリに移動し、Firebaseプロジェクトを初期化します。
```sh
firebase init functions
```

### 5. 依存関係のインストール
functionsディレクトリに移動し、必要な依存関係をインストールします。

```sh
cd functions
npm install
```
### 6. Cloud Functionsのデプロイ
関数をFirebaseにデプロイします。
```sh
firebase deploy --only functions
```
使用方法
デプロイが成功すると、関数のURLが表示されます。このURLに対してHTTPリクエストを送信して、関数をテストします。

リクエストの例
以下に、クエリパラメータを使用してリクエストを送信する例を示します。
```sh
curl "https://<your-region>-<your-project-id>.cloudfunctions.net/helloWorld?condition=info&uid=12345"
```

### クエリパラメータ
- condition: ログメッセージの種類を指定します。以下の値が使用できます。
  - log: 一般的なログメッセージ
  - info: 情報メッセージ
  - debug: デバッグメッセージ
  - warn: 警告メッセージ
  - error: エラーメッセージ
  - write: 複数のログメッセージを記録

- uid: ユーザーIDなどの識別子