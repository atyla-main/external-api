'use strict';
module.exports = (sequelize, DataTypes) => {
  var Order = sequelize.define('Order', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['creating',
          'aborted',
          'waiting',
          'cancelled',
          'processing',
          'payment_failed',
          'payment_aborted',
          'pending',
          'denied',
          'completed',
          'delevery_failed',
          'delivered']]
      }
    },
    statusHistory: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    amount: {
      allowNull: false,
      type: DataTypes.JSONB
    },
    fees: {
      allowNull: false,
      type: DataTypes.DECIMAL(5, 4)
    },
    source: {
      allowNull: false,
      type: DataTypes.STRING
    }
  });
  Order.associate = function(models) {
    Order.belongsTo(models.User, {
      foreignKey: 'userUuid'
    });
    Order.belongsTo(models.Merchant, {
      foreignKey: 'merchantUuid'
    });
    Order.belongsTo(models.Ico, {
      foreignKey: 'icoUuid'
    });
    Order.hasOne(models.Payment, {
      as: 'payment',
      foreignKey: 'orderUuid'
    });
  };
  return Order;
};
