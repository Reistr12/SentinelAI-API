import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.sequelize.transaction(async (t) => {
    const table = await queryInterface.describeTable('users');

    // camel -> snake (se necessário)
    if (table.createdAt && !table.created_at) {
      await queryInterface.renameColumn('users', 'createdAt', 'created_at', { transaction: t });
    }
    if (table.updatedAt && !table.updated_at) {
      await queryInterface.renameColumn('users', 'updatedAt', 'updated_at', { transaction: t });
    }

    // Soft delete (snake)
    const tableAfter = await queryInterface.describeTable('users');
    if (!tableAfter.deleted_at) {
      await queryInterface.addColumn(
        'users',
        'deleted_at',
        { type: DataTypes.DATE, allowNull: true },
        { transaction: t },
      );
    }
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.sequelize.transaction(async (t) => {
    const table = await queryInterface.describeTable('users');

    // remove soft delete se existir
    if (table.deleted_at) {
      await queryInterface.removeColumn('users', 'deleted_at', { transaction: t });
    }

    // snake -> camel (reversão)
    const tableAfter = await queryInterface.describeTable('users');
    if (tableAfter.created_at && !tableAfter.createdAt) {
      await queryInterface.renameColumn('users', 'created_at', 'createdAt', { transaction: t });
    }
    if (tableAfter.updated_at && !tableAfter.updatedAt) {
      await queryInterface.renameColumn('users', 'updated_at', 'updatedAt', { transaction: t });
    }
  });
}
