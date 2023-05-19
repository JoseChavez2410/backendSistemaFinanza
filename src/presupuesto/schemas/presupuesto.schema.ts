import { Schema } from "mongoose";

export const PresupuestoSchema = new Schema({
    usuario_id: {
        type: Schema.Types.ObjectId,
        ref:'usuarios'},
    monto: Number,
});
