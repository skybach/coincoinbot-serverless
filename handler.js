'use strict';

const request = require('request')

module.exports.hello = (event, context, callback) => {
  const TOKEN = process.env.TELEGRAM_TOKEN;
  const NASE_URL = `https://api.telegram.org/bot${TOKEN}`
  const KEYS = ['USDT_BTC', 'BTC_ETH', 'BTC_LTC', 'BTC_STR'];

  console.log(event)
  const data = event.body
  const message = data.message.text
  const chat_id = data.message.chat.id

  if (message.indexOf("/coins") == 0) {
    request.get('https://poloniex.com/public?command=returnTicker', {json: true}, function(err, resp, body) {
      const response = body.stringify(body)

      const data = {"text": response.encode("utf8"), "chat_id": chat_id}
      const url = BASE_URL + "/sendMessage"
      request.post(url, data)

      return {"statusCode": 200}
    });

    // const response = {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //     message: 'Go Serverless v1.0! Your function executed successfully!',
    //     input: event,
    //   }),
    // };

    callback(null, response);

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
  }
};