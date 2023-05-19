import { Controller, Get, Post, Body, Patch, Param, Delete,HttpStatus,Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { PresupuestoService } from 'src/presupuesto/presupuesto.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private readonly presupuestoService: PresupuestoService) {}

  @Post('register')
  async register(@Res() res, @Body() registerAuthDto: RegisterAuthDto) {
    const registro = await this.authService.registerUsuario(registerAuthDto);
    let presupuestoNuevo={
      usuario_id:registro._id,
      monto:0
    }
    await this.presupuestoService.createPresupuesto(presupuestoNuevo);
    return res.status(HttpStatus.OK).json({
      message: "Registro compleatado Exitosamente",
      registro: registro
    });
  }

  @Post('login')
  async login(@Res() res, @Body() loginAuthDto: LoginAuthDto) {
    const login = await this.authService.loginUsuario(loginAuthDto);
    return res.status(HttpStatus.OK).json({
      login: login
    });
  }

}
