import { Controller, 
  Get,
  Post,
  Put, 
  Delete, 
  Res, 
  HttpStatus, 
  Body, 
  Param, 
  NotFoundException, 
  Query, 
  UseGuards,
  Headers } from '@nestjs/common';

import { PresupuestoService } from './presupuesto.service';
import { CreatePresupuestoDTO } from './dto/presupuesto.dto';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { JwtService } from '@nestjs/jwt';

@UseGuards(JwtAuthGuard)
@Controller('presupuesto')
export class PresupuestoController {
  constructor(private readonly presupuestoService: PresupuestoService,
    private jwtService:JwtService){}
  
    @Post('/create')
    async createPresupuesto(@Res() res:any, @Body() createPresupuestoDTO:CreatePresupuestoDTO,@Headers('authorization') authorization: string){
    
      const token = authorization.split(' ')[1];
      const tokenDecenciptado=this.jwtService.verify(token);
      createPresupuestoDTO.usuario_id=tokenDecenciptado.id

      const presupuesto= await this.presupuestoService.createPresupuesto(createPresupuestoDTO);
      return res.status(HttpStatus.OK).json({
        message: "Presupuesto Creado Exitosamente",
        presupuesto: presupuesto
      });
    }

    @Get('/')
    async getPresupuestos(@Res() res:any){
      const presupuestos= await this.presupuestoService.getPresupuestos();
      return res.status(HttpStatus.OK).json({
        presupuestos: presupuestos
      });
    }

    @Get('/:presupuestoID')
    async getPresupuesto(@Res() res:any, @Param('presupuestoID') presupuestoID:string){
        const presupuesto= await this.presupuestoService.getPresupuesto(presupuestoID);
        if(!presupuesto) throw new NotFoundException('Presupuesto no existe');
        return res.status(HttpStatus.OK).json({
          presupuesto:presupuesto

        });
    }

    @Get('usuario/:usuarioID')
    async getPresupuestoUsuario(@Res() res:any, @Param('usuarioID') usuarioID:string){
        const presupuesto= await this.presupuestoService.getPresupuestoUser(usuarioID);
        if(!presupuesto) throw new NotFoundException('Presupuesto no existe');
        return res.status(HttpStatus.OK).json({
          presupuesto:presupuesto
        });
    }

    @Delete('/delete')
    async deletePresupuesto(@Res() res:any, @Query('presupuestoID') presupuestoID:string){
        const presupuesto= await this.presupuestoService.deletePresupuesto(presupuestoID);
        if(!presupuesto) throw new NotFoundException('Presupuesto no existe');
        return res.status(HttpStatus.OK).json({
            message:'Presupuesto Eliminado',
            presupuesto:presupuesto
        });
    }

    @Put('/update')
    async updatePresupuesto(@Res() res:any, @Body() createPresupuestoDTO:CreatePresupuestoDTO, @Query('presupuestoID') presupuestoID:string){
        const presupuesto= await this.presupuestoService.updatePresupuesto(presupuestoID,createPresupuestoDTO);
        if(!presupuesto) throw new NotFoundException('Gasto no existe');
        return res.status(HttpStatus.OK).json({
            message:'Presupuesto Modificado',
            presupuesto:presupuesto
        });
    }
  
}
