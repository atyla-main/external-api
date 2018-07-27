const JSONRelationsExposingService = require('../../exposing-services/json/relationships');

module.exports = {
  async expose(userSession) {
    return await ({
      data: {
        id: userSession.uuid,
        type: 'userSessions',
        attributes: {
          'user-agent': userSession.userAgent,
          'ip-address': userSession.ipAddress
        },
        relationships: await JSONRelationsExposingService.relationships(userSession, ['user'])
      }
    });
  }
};