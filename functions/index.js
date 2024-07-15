const { onRequest } = require('firebase-functions/v2/https')

exports.helloWorld = onRequest({
  region: 'asia-northeast1' // 東京リージョンを指定
}, async response => {
  response.status(200).send('hello')
})
