import { Injectable, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Usuario } from './interfaces/usuario.interface';
import {hash,compare} from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

  constructor(@InjectModel('Usuario') readonly usuarioModel: Model<Usuario>,
  private jwtService:JwtService){
  }

  async registerUsuario(registerAuthDto:RegisterAuthDto){
    const {password,email
    }=registerAuthDto;
    const findUsuario= await this.usuarioModel.findOne({email});
    if(findUsuario) throw new HttpException('Usuario ya registrado',404);

    const encriptado= await hash(password,10);
    registerAuthDto={...registerAuthDto, password:encriptado};
    
    const usuario = new this.usuarioModel(registerAuthDto);
    return await usuario.save();
  }

  async loginUsuario(loginAuthDto:LoginAuthDto){
    const {email,password}=loginAuthDto;
    const findUsuario= await this.usuarioModel.findOne({email});
    if(!findUsuario) throw new HttpException('Usuario no encontrado',404);

    const checkPassword = await compare(password,findUsuario.password);
    if(!checkPassword) throw new HttpException('Contraseña incorrecta',404);

    const payload= {id: findUsuario._id, name:findUsuario.name};
    const token= this.jwtService.sign(payload);

    const data={
      token:token
    };

    return data
  }
}
