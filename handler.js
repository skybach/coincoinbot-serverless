'use strict';

const request = require('request')

module.exports.hello = (event, context, callback) => {
  const TOKEN = process.env.TELEGRAM_TOKEN;
  const BASE_URL = `https://api.telegram.org/bot${TOKEN}`
  const KEYS = ['USDT_BTC', 'BTC_ETH', 'BTC_LTC', 'BTC_STR'];

  console.log('--------------')
  console.log(event)
  const data = JSON.parse(event.body)
  console.log(data)
  if (data.message) {
    const message = data.message.text
    const chat_id = data.message.chat.id

    if (message.indexOf("/coin") === 0) {
      request.get('https://poloniex.com/public?command=returnTicker', {json: true}, function(err, resp, body) {
        console.log(body)
        let response = ""
        for (var i=0; i<KEYS.length; i++) {
          var key = KEYS[i];
          console.log(key);
          response += key + ": " + body[key].last + '\n';
        }
        // const response = JSON.stringify(body)
        const data = {"text": response, "chat_id": chat_id}
        const url = BASE_URL + "/sendMessage"
        console.log(url)
        console.log(data)
        console.log(response)
        request.post(url, {json: true, body: data}, function(err, resp, body) {
          console.log(err)
          console.log(resp)
          console.log(body)        
        })

      });
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });

  // return {"statusCode": 200}
};