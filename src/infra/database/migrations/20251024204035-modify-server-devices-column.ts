import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.changeColumn('servers', 'devices', {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: ''
    });
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.changeColumn('servers', 'devices', {
      type: DataTypes.STRING(45),
      allowNull: false
    });
  }
};