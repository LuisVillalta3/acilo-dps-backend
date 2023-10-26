/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointment_types', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: Sequelize.STRING(250),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });

    // INSERT Tipo de consultas
    await queryInterface.bulkInsert('appointment_types', [
      {
        nombre: 'Consulta',
      },
      {
        nombre: 'Cirugía',
      },
      {
        nombre: 'Procedimiento',
      },
      {
        nombre: 'Estudio',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('appointment_types');
  },
};
