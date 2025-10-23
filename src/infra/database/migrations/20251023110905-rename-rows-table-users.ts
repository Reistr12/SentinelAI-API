import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  // Renomeia as colunas para snake_case
  await queryInterface.renameColumn('users', 'created_at', 'createdAt');
  await queryInterface.renameColumn('users', 'updated_at', 'updatedAt');
  // Caso queira usar soft delete
  const table = await queryInterface.describeTable('users');
  if (!table.deleted_at) {
    await queryInterface.addColumn('users', 'deleted_at', {
      type: DataTypes.DATE,
      allowNull: true,
    });
  }
}

export async function down(queryInterface: QueryInterface) {
  // Reverte para camelCase
  await queryInterface.renameColumn('users', 'created_at', 'createdAt');
  await queryInterface.renameColumn('users', 'updated_at', 'updatedAt');
  const table = await queryInterface.describeTable('users');
  if (table.deleted_at) {
    await queryInterface.removeColumn('users', 'deleted_at');
  }
}
