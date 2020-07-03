import express,{ Application, Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();

//my imported modules
import './database/mongoose';

const port = process.env.PORT || 8080;

const app: Application = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes
app.use('/api/v1',require('./routes/apis/user'));

app.get('/', (req: Request,res:Response) => {
    res.send('Hello community');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});