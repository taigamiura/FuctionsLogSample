const logger = require('firebase-functions/logger')

class LogHandler {
  /**
   * コンストラクタ：リクエスト情報とオプションを初期化する
   * @param {object} request - HTTPリクエストオブジェクト
   * @param {object} [options={}] - オプション設定
   */
  constructor (request, options = {}) {
    this.request = request
    this.params = request.query
    this.body = request.body
    this.headers = request.headers
    this.ip = request.ip
    this.options = options
    this.requestTimestamp = new Date().toISOString() // リクエスト時点のタイムスタンプを取得
  }

  /**
   * 共通のログデータを構築するプライベートメソッド
   * このメソッドはクラス内でのみ使用されることを想定している
   * @param {number|200} statusCode - HTTPステータスコード
   * @returns {object} - 構築されたログデータ
   * @private
   */
  _struct (statusCode = 200) {
    return {
      method: this.request.method, // HTTPメソッド（GET, POSTなど）
      url: this.request.url, // リクエストURL
      params: this.params, // クエリパラメータ
      body: this.body, // リクエストボディ
      headers: this.headers, // リクエストヘッダー
      ip: this.ip, // クライアントのIPアドレス
      requestTimestamp: this.requestTimestamp, // リクエストのタイムスタンプ
      responseTimestamp: new Date().toISOString(), // レスポンスのタイムスタンプ
      statusCode // HTTPステータスコード
    }
  }

  /**
   * ログを記録するメインメソッド
   * @param {number} statusCode - HTTPステータスコード
   * @param {string} message - ログメッセージ
   * @param {Error} [error] - 詳細ログのためのエラーオブジェクト（必要に応じて）
   */
  log(statusCode, message, error = null) {
    const logData = this._struct(statusCode) // ログデータを構築

    if (error) {
      logData.errorStack = error.stack // エラースタックトレースを追加
    }

    if (statusCode >= 500) {
      logger.error(message, logData) // ステータスコードが500以上の場合はエラーログを記録
    } else if (statusCode >= 400) {
      logger.warn(message, logData) // ステータスコードが400以上の場合は警告ログを記録
    } else {
      logger.info(message, logData) // それ以外は情報ログを記録
    }
  }
}

module.exports = LogHandler
