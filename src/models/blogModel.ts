import { Schema,Model,Types,Document,model } from 'mongoose';


interface Iblog extends Document{
    _id : Types.ObjectId,
    title: String,
    author: String,
    story: String,
    readTime ?: String
}

const blogSchema : Schema = new Schema({
    'title' : {
        type : String,
        required : true
    },
    'author':{
        type:String,
        required : true,
        default : 'Tamilore'
    },
    'story':{
        type : String,
        required : true
    },
    'readTime':{
        type : String
    },
    'createdAt':{
        type : Date,
        default: Date.now
    },
    'updatedAt': {
        type: Date,
        default: Date.now
    }
});

const blogModel = model('blogs',blogSchema);

export default blogModel;