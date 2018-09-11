module.exports = {
  async expose(cryptocurrency) {
    return await ({
      data: {
        id: cryptocurrency.uuid,
        type: 'cryptocurrencies',
        attributes: {
      		'name': cryptocurrency.name,
          'symbol': cryptocurrency.symbol,
      		'quote': cryptocurrency.quote,
      		'apiId': cryptocurrency.apiId
        },
        relationships: {}
      }
    });
  }
};
