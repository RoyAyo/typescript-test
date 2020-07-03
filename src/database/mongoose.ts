import mongoose from "mongoose";

const MONGO_URI = 'mongodb://localhost:27017/cluster-community';

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URI,{useUnifiedTopology: true,useNewUrlParser:true}).then(() => {
    console.log(`conected to mongo successfully`);
}).catch((err) => {
    console.log(err);
});