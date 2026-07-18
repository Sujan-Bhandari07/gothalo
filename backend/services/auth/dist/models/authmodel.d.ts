import mongoose from "mongoose";
import type { IAuth } from "../types/modeltype.js";
declare const Auth: mongoose.Model<IAuth, {}, {}, {}, mongoose.Document<unknown, {}, IAuth, {}, mongoose.DefaultSchemaOptions> & IAuth & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IAuth>;
export { Auth };
