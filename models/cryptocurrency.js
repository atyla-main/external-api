'use strict';
module.exports = (sequelize, DataTypes) => {
  var Cryptocurrency = sequelize.define('Cryptocurrency', {
    uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    symbol: {
      allowNull: false,
      type: DataTypes.STRING
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    quote: {
      type: DataTypes.JSONB
    },
    apiId: {
      type: DataTypes.INTEGER
    }
  }, {});

  return Cryptocurrency;
};
