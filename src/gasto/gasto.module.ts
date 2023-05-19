import { Module } from '@nestjs/common';
import { GastoController } from './gasto.controller';
import { GastoService } from './gasto.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GastoSchema } from './schemas/gasto.schema';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constans/jwt.constans';



@Module({
  imports:[
    MongooseModule.forFeature([
      {name:"Gasto", schema: GastoSchema}
    ]),
    JwtModule.register({
      secret:jwtConstants.secret,
      signOptions:{expiresIn:'1d'}
    })
  ],
  controllers: [GastoController],
  providers: [GastoService,JwtStrategy]
})
export class GastoModule {}
