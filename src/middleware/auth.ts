import { Request,Response, NextFunction } from 'express';

import User from '../models/userModel';

const userAuth = (req : Request, res: Response,next : NextFunction) => {
    try{
        const token : any = req.header('x-auth');

        if(token){
            User.verifyToken(token).then((user: any) => {
                req.body.user = user;
                next();
            })
            .catch((err: any) => {
                res.status(400).send(err.message);
            });
        }else{
            res.sendStatus(401);
        }
    }
    catch(e){
        res.sendStatus(500);
    }
}

export default userAuth;