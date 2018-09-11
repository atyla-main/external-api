const JSONRelationsExposingService = require('../../exposing-services/json/relationships');

module.exports = {
  async expose(ico) {
    return await ({
      data: {
        id: ico.uuid,
        type: 'icos',
        attributes: {
      		'name': ico.name,
          'coin': ico.coin,
      		'ico-website-url': ico.icoWebsiteUrl,
      		'block-chain': ico.blockChain,
      		'description': ico.description
        },
        relationships: await JSONRelationsExposingService.relationships(ico, ['merchant', 'prices'])
      }
    });
  }
};
