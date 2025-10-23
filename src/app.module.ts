import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './infra/database/models/user.model';
import { DeviceModel } from './infra/database/models/device.model';
import { MetricModel } from './infra/database/models/metric.model';
import { AlertModel } from './infra/database/models/alert.model';
import { AlertSettingModel } from './infra/database/models/alert-setting.model';
import { UserModule } from './presentation/controllers/users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'sentinel_user',
    password: 'sentinel_pass',
    database: 'sentinel_db',
    models: [UserModel, DeviceModel, MetricModel, AlertModel, AlertSettingModel],
    autoLoadModels: true,
    synchronize: true,
}),
    UserModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
