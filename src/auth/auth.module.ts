import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioSchema } from './schemas/usuario.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constans/jwt.constans';
import { PresupuestoModule } from 'src/presupuesto/presupuesto.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:"Usuario", schema: UsuarioSchema}
    ]),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'1d'}
    }),
    PresupuestoModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
