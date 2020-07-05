import { Schema, model, Types, Document, Model } from 'mongoose';
//import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

interface IprofileSchema extends Document{
    'user_id' : Types.ObjectId,
    'avatar' : string,
}

const profileSchema:Schema = new Schema({
    'user_id' : {
        type: Types.ObjectId,
        required : true
    },
    'avatar' : {
        type : String
    }
});

const Profile = model<IprofileSchema>('profiles',profileSchema);

export default Profile;