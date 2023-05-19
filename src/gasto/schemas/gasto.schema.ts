import { Schema } from "mongoose";

export const GastoSchema = new Schema({
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref:'usuarios'},
    categoria: String,
    descripcion: String,
    monto: Number,
    fecha: Date
});

