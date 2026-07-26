import type { Types } from "mongoose";
import mongoose from "mongoose";
export interface IConversation {
    messages: Types.ObjectId[];
    owner: string;
    title: string;
}
declare const Conversation: mongoose.Model<IConversation, {}, {}, {}, mongoose.Document<unknown, {}, IConversation, {}, mongoose.DefaultSchemaOptions> & IConversation & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IConversation>;
export { Conversation };
