'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserSession = sequelize.define('UserSession', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userAgent: DataTypes.JSONB,
    ipAddress: DataTypes.STRING
  });
  UserSession.associate = function(models) {
    UserSession.belongsTo(models.User, {
      foreignKey: 'userUuid'
    });
  };
  return UserSession;
};