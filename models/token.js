'use strict';
module.exports = (sequelize, DataTypes) => {
  var Token = sequelize.define('Token', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    amount: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {});
  Token.associate = function(models) {
    Token.belongsTo(models.User, {
      foreignKey: 'userUuid'
    });
  };
  return Token;
};