import { Document } from "mongoose";

export interface Usuario extends Document {
    name: string,
    email: string,
    password: string
}