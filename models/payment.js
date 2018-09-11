'use strict';
module.exports = (sequelize, DataTypes) => {
  var Payment = sequelize.define('Payment', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    amount: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    reference: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[
          'waiting',
          'received',
          'processed',
          'denied',
          'cancelled',
          'expired',
          'refunded']]
      }
    },
    statusHistory: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[
          'crypto',
          'wire',
          'paypal']]
      }
    },
    paymentData: {
      allowNull: false,
      type: DataTypes.JSONB
    }
  });
  Payment.associate = function(models) {
    Payment.belongsTo(models.Order, {
      foreignKey: 'orderUuid'
    });
    Payment.hasMany(models.Transaction, {
      as: 'transactions',
      foreignKey: 'paymentUuid'
    });
  };
  return Payment;
};
