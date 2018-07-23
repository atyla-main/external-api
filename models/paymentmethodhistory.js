'use strict';
module.exports = (sequelize, DataTypes) => {
  var PaymentMethodHistory = sequelize.define('PaymentMethodHistory', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    infos: {
      allowNull: false,
      type: DataTypes.JSONB
    }
  });
  PaymentMethodHistory.associate = function(models) {
    PaymentMethodHistory.belongsTo(models.User, {
      foreignKey: 'userUuid'
    });
  };
  return PaymentMethodHistory;
};