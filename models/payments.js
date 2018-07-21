'use strict';
module.exports = (sequelize, DataTypes) => {
  var Payments = sequelize.define('Payments', {
    stage: DataTypes.STRING,
    stage: {
      allowNull: false,
      type: DataTypes.STRING
    },
    paymentMean: {
      allowNull: false,
      type: DataTypes.STRING
    },
    amount: {
      allowNull: false,
      type: DataTypes.DECIMAL(11, 4)
    },
    currency: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastStatut: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  Payments.associate = function(models) {
    Payments.belongsTo(models.User, {
      through: 'UserUuid'
    });
    Payments.belongsTo(models.Order, {
      through: 'OrderId'
    });
  };
  return Payments;
};