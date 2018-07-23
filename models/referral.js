'use strict';
module.exports = (sequelize, DataTypes) => {
  var Referral = sequelize.define('Referral', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    label: {
      allowNull: false,
      type: DataTypes.STRING
    },
    metric: {
      type: DataTypes.INTEGER
    },
    suffix: {
      allowNull: false,
      type: DataTypes.STRING
    },
    link: {
      allowNull: false,
      type: DataTypes.STRING
    },
    picto: {
      allowNull: true,
      type: DataTypes.STRING
    },
  }, {});
  Referral.associate = function(models) {
     Referral.belongsTo(models.Ico, {
      foreignKey: 'icoUuid'
    });
  };
  return Referral;
};