const JSONRelationsExposingService = require('../../exposing-services/json/relationships');

module.exports = {
  async expose(price) {
    return await ({
      data: {
        id: price.uuid,
        type: 'prices',
        attributes: {
          'amount': price.amount,
          'end-date': price.endDate,
          'start-date': price.startDate
        },
        relationships: await JSONRelationsExposingService.relationships(price, ['ico'])
      }
    });
  }
};