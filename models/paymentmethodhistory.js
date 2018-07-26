'use strict';
module.exports = (sequelize, DataTypes) => {
  var PaymentMethodHistory = sequelize.define('PaymentMethodHistory', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
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