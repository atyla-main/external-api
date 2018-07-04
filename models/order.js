'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    orderMean: DataTypes.STRING,
    currentStage: DataTypes.STRING,
    motif: DataTypes.STRING
  });
  Order.associate = function(models) {
    Order.belongsTo(models.User, {
      foreignKey: 'userUuid'
    });
    Order.belongsTo(models.Ico, {
      foreignKey: 'icoId'
    });
  };
  return Order;
};