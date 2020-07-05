import express,{ Application, Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import SocketIO from 'socket.io';
import * as http from 'http';
dotenv.config();

//my imported modules
import './database/mongoose';

const port = process.env.PORT || 8080;

var app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));


//routes
app.use('/api/v1',require('./routes/api/app'));


//const server = http.createServer(app);
const server = SocketIO();


//chat room
app.use('/api/v2/clusterRoom',require('./routes/api/room')(server));


app.get('/', (req: Request,res:Response) => {
    res.send('Hello community');
});


app.listen(port, () => {
    console.log(`Running on port ${port}`);
});