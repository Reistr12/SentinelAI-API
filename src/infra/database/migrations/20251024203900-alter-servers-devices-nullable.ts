import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('servers', 'devices', {
      type: DataTypes.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.changeColumn('servers', 'devices', {
      type: DataTypes.STRING,
      allowNull: false
    });
  }
};