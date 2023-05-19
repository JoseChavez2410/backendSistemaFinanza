import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose'; 
import { AppService } from './app.service';
import { GastoModule } from './gasto/gasto.module';
import { AuthModule } from './auth/auth.module';
import { configConstants } from './config/envConfig';
import { PresupuestoModule } from './presupuesto/presupuesto.module';



@Module({
  imports: [GastoModule,
    MongooseModule.forRoot(`mongodb://${configConstants.MONGODB_USERNAME}:${configConstants.MONGODB_PASSWORD}`
      +`@${configConstants.MONGODB_IP}:${configConstants.MONGODB_PORT}/${configConstants.MONGODB_DATABASE}?authMechanism=DEFAULT&authSource=admin`),
    AuthModule,
    PresupuestoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
