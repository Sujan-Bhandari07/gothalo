import mongoose, { Types } from "mongoose";
interface IMessage {
    prompt: string;
    response: string;
    images: string[];
    agent: string;
    conversationid: Types.ObjectId;
    files: [
        {
            name: String;
            content: String;
        }
    ];
}
declare const Message: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage, {}, mongoose.DefaultSchemaOptions> & IMessage & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, IMessage>;
export { Message };
