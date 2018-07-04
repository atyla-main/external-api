'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      stage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      paymentMean: {
        allowNull: false,
        type: Sequelize.STRING
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(11, 4)
      },
      currency: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastStatut: {
        allowNull: false,
        type: Sequelize.STRING
      },
      UserUuid: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      OrderId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Payments');
  }
};