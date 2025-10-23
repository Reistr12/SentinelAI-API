import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable('alerts', {
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
    metric_type: { type: DataTypes.STRING, allowNull: false },
    threshold: { type: DataTypes.FLOAT, allowNull: false },
    triggered_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    status: { type: DataTypes.ENUM('OPEN','RESOLVED'), allowNull: false, defaultValue: 'OPEN' },
    created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable('alerts');
}
