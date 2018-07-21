const JSONRelationsExposingService = require('../../exposing-services/json/relationships');

module.exports = {
  async expose(order) {
    return await ({
      data: {
        id: order.uuid,
        type: 'orders',
        attributes: {
          'amount': order.amount,
          'fees': order.fees,
          'status': order.status,
          'status-history': order.statusHistory,
          'source': order.source
        },
        relationships: await JSONRelationsExposingService.relationships(order, ['user'])
      }
    });
  }
};