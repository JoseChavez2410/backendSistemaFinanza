import { Schema } from "mongoose";

export const UsuarioSchema = new Schema({
    name: String,
    email: String,
    password: String
});

