import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './infra/database/models/user.model';
import { Device } from './infra/database/models/device.model';
import { Metric } from './infra/database/models/metric.model';
import { Alert } from './infra/database/models/alert.model';
import { AlertSetting } from './infra/database/models/alert-setting.model';

@Module({
  imports: [SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.DB_HOST ?? 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'postgres',
  models: [User, Device, Metric, Alert, AlertSetting], 
    autoLoadModels: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
