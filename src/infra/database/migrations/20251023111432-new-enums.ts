import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.sequelize.query(`
    ALTER TYPE "enum_users_role" ADD VALUE IF NOT EXISTS 'SUPER_ADMIN';
  `);
  await queryInterface.sequelize.query(`
    ALTER TYPE "enum_users_role" ADD VALUE IF NOT EXISTS 'COMPANY_ADMIN';
  `);
  await queryInterface.sequelize.query(`
    ALTER TYPE "enum_users_role" ADD VALUE IF NOT EXISTS 'TECHNICIAN';
  `);
  await queryInterface.sequelize.query(`
    ALTER TYPE "enum_users_role" ADD VALUE IF NOT EXISTS 'ANALYST';
  `);
}
export async function down(queryInterface: QueryInterface) {
  // Postgres não permite remover enum facilmente.
  // Para "desfazer" seria preciso recriar o enum sem os valores.
}
