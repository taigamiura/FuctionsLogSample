const { onRequest } = require('firebase-functions/v2/https')
const LogHandler = require('./logHandler')

exports.helloWorld = onRequest({
  region: 'asia-northeast1' // 東京リージョンを指定
}, async (request, response) => {
  sampleFunc(request, response)
})

const sampleFunc = (request, response)=> {

  const logHandler = new LogHandler(request)
  let statusCode = 200
  let message

  try {
    const type = request.query.type
    switch (type) {
      case 'warn':
        statusCode = 400
        break
      case 'error':
        statusCode = 500
        break
    }
    if (statusCode >= 400 && statusCode <= 500) {
      throw Error('Internal Server Error')
    }
    message = 'Request handled successfully'
  } catch (error) {
    message = error.message
  } finally {
    logHandler.log(statusCode, message)
    response.status(statusCode).send(message)
  }

}