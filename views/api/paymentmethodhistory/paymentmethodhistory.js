const JSONRelationsExposingService = require('../../exposing-services/json/relationships');

module.exports = {
  async expose(paymentMethodHistory) {
    return await ({
      data: {
        id: paymentMethodHistory.uuid,
        type: 'paymentMethodHistorys',
        attributes: {
          'infos': paymentMethodHistory.infos
        },
        relationships: await JSONRelationsExposingService.relationships(paymentMethodHistory, ['user'])
      }
    });
  }
};