import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateGastoDTO } from './dto/gasto.dto';
import { Gasto } from './interfaces/gasto.interface';

@Injectable()
export class GastoService {

    constructor(@InjectModel('Gasto') readonly gastoModel: Model<Gasto>){
    }

    async getGastos(): Promise<Gasto[]>{
        const gastos=await this.gastoModel.find();
        return gastos;
    }

    async getGastosUsuario(usuario_id: string): Promise<Gasto[]>{
        const gasto= await this.gastoModel.find({usuario_id});
        return gasto;
    }

    async getGasto(gastoID: string): Promise<Gasto>{
        const gasto= await this.gastoModel.findById(gastoID);
        return gasto;
    }

    async createGasto(createGastoDTO:CreateGastoDTO): Promise<Gasto>{
        const gasto = new this.gastoModel(createGastoDTO);
        return await gasto.save();
    }

    async updateGasto(gastoID: string,createGastoDTO:CreateGastoDTO):Promise<Gasto>{
        const gasto = await this.gastoModel.findByIdAndUpdate(gastoID,createGastoDTO,{new:true})
        return gasto
    }

    async deleteGasto(gastoID: string):Promise<Gasto>{
        const deleteGasto= await this.gastoModel.findByIdAndDelete(gastoID);
        return deleteGasto;
    }



}
