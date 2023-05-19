import { Module } from '@nestjs/common';
import { PresupuestoService } from './presupuesto.service';
import { PresupuestoController } from './presupuesto.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PresupuestoSchema } from './schemas/presupuesto.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constans/jwt.constans';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:"Presupuesto", schema: PresupuestoSchema}
    ]),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'1d'}
    })
  ],
  controllers: [PresupuestoController],
  providers: [PresupuestoService,JwtStrategy],
  exports: [PresupuestoService]
})
export class PresupuestoModule {}
