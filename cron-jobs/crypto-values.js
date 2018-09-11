const request = require('request-promise');
const CronJob = require('cron').CronJob;
const Cryptocurrency = require('../models').Cryptocurrency;

async function updateCurrenciesQuote() {
  console.log("UPDATE");
  let requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/tools/price-conversion',
    qs: {
      amount: 1,
      id: 1027,
      convert: 'USD,EUR'
    },
    headers: {
      'X-CMC_PRO_API_KEY': 'efbbb081-c577-47e2-87da-940f47bb3c99'
    },
    json: true,
    gzip: true
  };

  let cryptocurrencies = await Cryptocurrency.all();

  for (cryptocurrency in cryptocurrencies) {
    console.log("+++++++++++++ UPDATE TOKEN +++++++++++++++++");
    let token = cryptocurrencies[cryptocurrency];
    console.log("TOKEN name => ", token.name);
    requestOptions.qs.id = token.apiId;
    console.log("REQUEST OPTION => ", requestOptions);
    let apiRes = await request(requestOptions);

    if (apiRes.status['error_code'] == 0) {
      console.log("=============================================");
      console.log("API RESULT: ", apiRes);
      console.log("=============================================");
      let attributes = { quote: apiRes.data.quote };

      console.log("Atrributes => ", attributes);
      await token.update(attributes, { fields: Object.keys(attributes) });
      console.log("+++++++++++++ TOKEN UPDATED ++++++++++++++++");
    }
  }
}

module.exports = {
  start() {
    const job = new CronJob('0 */10 * * * *', function() {
    	const d = new Date();
    	console.log('Every Ten Minutes:', d);
      updateCurrenciesQuote();
    }, null, true, 'Europe/Paris');

    job.start();
  }
}
