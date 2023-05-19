import { Controller, Get,Post,Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query, UseGuards,Headers } from '@nestjs/common';

import { CreateGastoDTO } from './dto/gasto.dto';
import { GastoService } from './gasto.service';
import { JwtAuthGuard } from 'src/auth/jwt-guard';
import { JwtService } from '@nestjs/jwt';



@UseGuards(JwtAuthGuard)
@Controller('gasto')
export class GastoController {

    constructor(private gastoService:GastoService,
        private jwtService:JwtService){}

    @Post('/create')
    async createGasto(@Res() res, @Body() createGastoDTO:CreateGastoDTO,@Headers('authorization') authorization: string){
        
        const token = authorization.split(' ')[1];
        const tokenDecenciptado=this.jwtService.verify(token);
        createGastoDTO.usuario_id=tokenDecenciptado.id

        const gasto= await this.gastoService.createGasto(createGastoDTO);
        return res.status(HttpStatus.OK).json({
            message: "Gasto Creado Exitosamente",
            gasto: gasto
        });
    }
    @Get('/')
    async getGastos(@Res() res){
        const gastos= await this.gastoService.getGastos();
        return res.status(HttpStatus.OK).json({
            gastos
        });
    }

    @Get('usuario/:usuarioID')
    async getGastoUsuario(@Res() res, @Param('usuarioID') usuarioID){
        const gasto= await this.gastoService.getGastosUsuario(usuarioID);
        return res.status(HttpStatus.OK).json({
            gastos:gasto
        });
    }

    @Get('/:gastoID')
    async getGasto(@Res() res, @Param('gastoID') gastoID){
        const gasto= await this.gastoService.getGasto(gastoID);
        if(!gasto) throw new NotFoundException('Gasto no existe');
        return res.status(HttpStatus.OK).json({
            gasto

        });
    }

    @Delete('/delete')
    async deleteGasto(@Res() res, @Query('gastoID') gastoID){
        const gasto= await this.gastoService.deleteGasto(gastoID);
        if(!gasto) throw new NotFoundException('Gasto no existe');
        return res.status(HttpStatus.OK).json({
            message:'Gasto Eliminado',
            gasto
        });
    }

    @Put('/update')
    async updateGasto(@Res() res, @Body() createGastoDTO:CreateGastoDTO, @Query('gastoID') gastoID){
        const gasto= await this.gastoService.updateGasto(gastoID,createGastoDTO);
        if(!gasto) throw new NotFoundException('Gasto no existe');
        return res.status(HttpStatus.OK).json({
            message:'Gasto Modificado',
            gasto
        });
    }

}
