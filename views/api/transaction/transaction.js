const JSONRelationsExposingService = require('../../exposing-services/json/relationships');

module.exports = {
  async expose(transaction) {
    return await ({
      data: {
        id: transaction.uuid,
        type: 'transactions',
        attributes: {
          'amount': transaction.amount,
          'status': transaction.status
        },
        relationships: await JSONRelationsExposingService.relationships(transaction, ['payment'])
      }
    });
  }
};