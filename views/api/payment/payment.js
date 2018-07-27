const JSONRelationsExposingService = require('../../exposing-services/json/relationships');

module.exports = {
  async expose(payment) {
    return await ({
      data: {
        id: payment.uuid,
        type: 'payments',
        attributes: {
          'amount': payment.amount,
          'reference': payment.reference,
          'status': payment.status,
          'status-history': payment.statusHistory,
          'payment-method': payment.paymentMethod,
          'payment-data': payment.paymentData
        },
        relationships: await JSONRelationsExposingService.relationships(payment, ['order', 'transactions'])
      }
    });
  }
};