/* eslint-disable prettier/prettier */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'doctors',
      'idEspecialidad',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'specialties',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('doctors', 'idEspecialidad');
  }
};
