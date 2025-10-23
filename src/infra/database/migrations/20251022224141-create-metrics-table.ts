import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('metrics', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    device_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: 'devices', key: 'id' },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    type: { type: DataTypes.STRING, allowNull: false }, // exemplo: temperature, humidity
    value: { type: DataTypes.FLOAT, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('metrics');
}
