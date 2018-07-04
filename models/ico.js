'use strict';
module.exports = (sequelize, DataTypes) => {
	var Ico = sequelize.define('Ico', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		link: {
			type: DataTypes.STRING,
			allowNull: false
		},
		blockChain: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.JSONB,
			allowNull: false
		}
	});
	return Ico;
};
