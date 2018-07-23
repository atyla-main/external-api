'use strict';
module.exports = (sequelize, DataTypes) => {
	var Ico = sequelize.define('Ico', {
    uuid: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
    coin: {
			allowNull: false,
			type: DataTypes.STRING
    },
		icoWebsiteUrl: {
			allowNull: false,
			type: DataTypes.STRING
		},
		blockChain: {
			allowNull: false,
			type: DataTypes.STRING
		},
		description: {
			allowNull: false,
			type: DataTypes.JSONB
		},
    minInvest: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    maxInvest: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.JSONB)
    },
    referalreward: {
      allowNull: true,
      type: DataTypes.STRING
    },
    category: {
      allowNull: true,
      type: DataTypes.STRING
    },
    whitepapper: {
      allowNull: true,
      type: DataTypes.STRING
    },
    softCap: {
      allowNull: true,
      type: DataTypes.JSONB
    },
    hardCap: {
      allowNull: true,
      type: DataTypes.JSONB
    },
    linkedinCofounders: {
      allowNull: true,
      type: DataTypes.JSONB
    },
    moneyRaised: {
      allowNull: true,
      type: DataTypes.JSONB
    },
    teamSize: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    ranking: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    lastUpdate: {
      allowNull: true,
      type: DataTypes.DATE
    },
    logo: {
      allowNull: true,
      type: DataTypes.STRING
    },
	});
  Ico.associate = function(models) {
    Ico.belongsTo(models.Merchant, {
      foreignKey: 'merchantUuid'
    });
    Ico.hasMany(models.Referral, {
      as: 'referrals',
      foreignKey: 'icoUuid'
    });
  };
	return Ico;
};
