import { Schema,model,Types,Document,Model } from 'mongoose';
import validator from 'validator';
import * as jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();

interface IuserSchema extends Document{ 
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

interface IuserBase extends IuserSchema{
    generateAuthToken(): Promise<string>
}

interface IuserModel extends Model<IuserBase>{
    verifyToken(token: string): Promise<string>
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
            '_id': false,
            'access' : {
                type: String,
                required:true
            },
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

userSchema.methods.generateAuthToken = async function() {
    var user = this;

    const _id:Types.ObjectId = user._id;

    const salt: string = process.env.salt || "Helloworld";
    const token:string = await jwt.sign({_id : _id.toHexString()},salt).toString();
    const access:string = "auth";

    user.tokens.push({access,token});
    
    return user.save().then(() => {
        return token;
    });
}

userSchema.statics.verifyToken = async function(token : string){
    var User = this;
    const access : string = "auth";
    const salt: string = process.env.salt || "Helloworld";
    try{
        const decoded: any = await jwt.verify(token, salt);
    
        return User.findOne(
            {
                'tokens.token': token,
                '_id': decoded._id,
                'tokens.access' : access
            }

        );
    
    }catch(e){
        return Promise.reject(e);
    }
}


const User = model<IuserBase,IuserModel>('user',userSchema);

export default User;