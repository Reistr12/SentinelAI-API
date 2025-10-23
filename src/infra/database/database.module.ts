// src/infra/database/database.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import { DeviceModel } from './models/device.model';
import { MetricModel } from './models/metric.model';
import { AlertModel } from './models/alert.model';
import { AlertSettingModel } from './models/alert-setting.model';


@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, DeviceModel, MetricModel, AlertModel, AlertSettingModel]), // registra o model para injeção
  ],
  exports: [SequelizeModule],
})
export class DatabaseModule {}
