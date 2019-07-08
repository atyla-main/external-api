'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    amount: {
      allowNull: false,
      type: DataTypes.JSONB
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
    }
  });
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Payment, {
      foreignKey: 'paymentUuid'
    });
  };
  return Transaction;
};