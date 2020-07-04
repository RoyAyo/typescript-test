import { Request,Response, NextFunction } from 'express';

import User from '../models/userModel';

const userAuth = (req : Request, res: Response,next : NextFunction) => {
    try{
        const token: any = req.header('x-auth');

        if(token){

            User.verifyToken(token).then((user: any) => {
                if (user) {
                    next();
                }
            })
            .catch((err: any) => {
                res.status(400).send(err.message);
            });
        }
    }
    catch(e){
        res.status(404).send('Error');
    }
}

export default userAuth;