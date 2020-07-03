import express,{ Application, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
dotenv.config();

//my imported modules
import './database/mongoose';

const port = process.env.PORT || 8080

const app: Application = express();

app.get('/', (req: Request,res:Response) => {
    res.send('Hello community');
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});