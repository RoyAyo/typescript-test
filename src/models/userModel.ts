import { Schema,model,Types,Document } from 'mongoose';
import validator from 'validator';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

interface Iuser extends Document{ 
    _id : Types.ObjectId,
    name : string,
    email:string,
    username:string,
    password : string,
    isVerifed: boolean,
    isAdmin:boolean,
    tokens : Array<string>,
    createdAt: string,
    updatedAt: string
}

const userSchema:Schema = new Schema({
    'name' : {
        type : String,
        required : true,
        trim : true,
        maxlength: 15
    },
    'username' : {
        type: String,
        required : true,
        trim : true,
    },
    'email' : {
        type: String,
        required : true,
        trim : true,
        unique : true,
        validate : {
            validator : validator.isEmail,
            message: 'Email not valid'
        }
    },
    'password' : {
        minlength : 8,
        required : true,
        type: String
    },
    'isVerified':{
        default:false
    },
    'isAdmin': {
        default:false,
        type: Number
    },
    'tokens':[
        {
            'access' : {
                type: String,
                required:true
            }
        },
        {
            'token' : {
                type:String,
                required:true
            }
        }
    ],
    'createdAt' : {
        type: Date,
        default : Date.now
    },
    'updatedAt' :{
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = async function(body : Iuser) {
    var user = this;

    const _id:Types.ObjectId = body._id;

    const salt: string = process.env.salt || "Helloworld";
    const token:string = await jwt.sign({_id : _id.toHexString()},salt).toString();
    
    user.tokens.concat({ access:"auth",token });

}

const User = model<Iuser>('user',userSchema);

export default User;