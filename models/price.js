'use strict';
module.exports = (sequelize, DataTypes) => {
  var Price = sequelize.define('Price', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    amount: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE
    },
    endAmountRaised: {
      type: DataTypes.INTEGER
    },
    startAmountRaised: {
      type: DataTypes.INTEGER
    },
  });
  Price.associate = function(models) {
    Price.belongsTo(models.Merchant, {
      foreignKey: 'merchantUuid'
    });
  };
  return Price;
};
