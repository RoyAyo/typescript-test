import { Types } from 'mongoose';

interface IuserSchema extends Document {
    _id: Types.ObjectId,
    name: string,
    email: string,
    username: string,
    password: string,
    isVerifed: boolean,
    isAdmin: boolean,
    tokens: Array<string>,
    createdAt: string,
    updatedAt: string
}

export default IuserSchema;