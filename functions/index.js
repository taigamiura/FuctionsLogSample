const { onRequest } = require('firebase-functions/v2/https');
const LogHandler = require('./logHandler');

exports.helloWorld = onRequest({
  region: 'asia-northeast1' // 東京リージョンを指定
}, async (request, response) => {
  response.status(200).send('helloWorld');
});
