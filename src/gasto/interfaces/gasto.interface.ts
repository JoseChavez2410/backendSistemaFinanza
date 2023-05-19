import { Document } from "mongoose";

export interface Gasto extends Document {
    usuario_id: string;
    categoria_id: string;
    descripcion: string;
    monto: number;
    fecha: Date;
}