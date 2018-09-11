const JSONRelationsExposingService = require('../../exposing-services/json/relationships');

module.exports = {
  async expose(merchant) {
    return await ({
      data: {
        id: merchant.uuid,
        type: 'merchants',
        attributes: {
          'legal-name': merchant.legalName,
          'commission-rate': merchant.commissionRate
        },
        relationships: await JSONRelationsExposingService.relationships(merchant, ['orders', 'icos'])
      }
    });
  }
};
