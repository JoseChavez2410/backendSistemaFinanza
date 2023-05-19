import { Document } from "mongoose";

export interface Presupuesto extends Document {
    usuario_id: string;
    monto: number;
}