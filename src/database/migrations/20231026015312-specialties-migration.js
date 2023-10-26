/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('specialties', {
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

    // INSERT SPECIALTIES
    await queryInterface.bulkInsert('specialties', [
      {
        nombre: 'Cirugía General',
      },
      {
        nombre: 'Cirugía Plástica',
      },
      {
        nombre: 'Cirugía Vascular',
      },
      {
        nombre: 'Dermatología',
      },
      {
        nombre: 'Endocrinología',
      },
      {
        nombre: 'Gastroenterología',
      },
      {
        nombre: 'Ginecología',
      },
      {
        nombre: 'Hematología',
      },
      {
        nombre: 'Infectología',
      },
      {
        nombre: 'Medicina Interna',
      },
      {
        nombre: 'Medicina General',
      },
      {
        nombre: 'Nefrología',
      },
      {
        nombre: 'Neumología',
      },
      {
        nombre: 'Neurología',
      },
      {
        nombre: 'Nutrición',
      },
      {
        nombre: 'Oftalmología',
      },
      {
        nombre: 'Oncología',
      },
      {
        nombre: 'Otorrinolaringología',
      },
      {
        nombre: 'Pediatría',
      },
      {
        nombre: 'Psiquiatría',
      },
      {
        nombre: 'Reumatología',
      },
      {
        nombre: 'Traumatología',
      },
      {
        nombre: 'Urología',
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('specialties');
  },
};
