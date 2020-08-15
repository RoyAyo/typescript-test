import { Request,NextFunction,Response } from 'express';

import User from '../models/userModel';

const adminAuth = (req:Request, res:Response, next:NextFunction) => {
    try{
        const token : any = req.header('X-AUTH');

        if(token){
            User.verifyToken(token).then((user:any) => {
                if(user.isAdmin){
                    next();
                }else{
                    return res.sendStatus(401);
                }
            })
        }
    }
    catch(e){
        return res.sendStatus(400);
    }
};

export default adminAuth;