import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreatePresupuestoDTO } from './dto/presupuesto.dto';
import { Presupuesto } from './interfaces/presupuesto.interface';

@Injectable()
export class PresupuestoService {

    constructor(@InjectModel('Presupuesto') readonly presupuestoModel: Model<Presupuesto>){
    }

    async getPresupuestos(): Promise<Presupuesto[]>{
        const presupuestos=await this.presupuestoModel.find();
        return presupuestos;
    }

    async getPresupuestoUser(usuario_id: string): Promise<Presupuesto>{
        const presupuesto=await this.presupuestoModel.findOne({usuario_id})
        return presupuesto;
    }

    async getPresupuesto(presupuestoID: string): Promise<Presupuesto>{
        const getPresupuesto= await this.presupuestoModel.findById(presupuestoID);
        return getPresupuesto;
    }

    async createPresupuesto(createPresupuestoDTO:CreatePresupuestoDTO): Promise<Presupuesto>{
        const presupuesto = new this.presupuestoModel(createPresupuestoDTO);
        return await presupuesto.save();
    }

    async updatePresupuesto(presupuestoID: string,createPresupuestoDTO:CreatePresupuestoDTO):Promise<Presupuesto>{
        const presupuesto = await this.presupuestoModel.findByIdAndUpdate(presupuestoID,createPresupuestoDTO,{new:true})
        return presupuesto
    }

    async deletePresupuesto(presupuestoID: string):Promise<Presupuesto>{
        const deletePresupuesto= await this.presupuestoModel.findByIdAndDelete(presupuestoID);
        return deletePresupuesto;
    }

}
