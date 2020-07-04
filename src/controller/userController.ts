import {Request, Response} from 'express';
import * as _ from "lodash";

import User from '../models/userModel';
import { NextFunction } from 'connect';

export const userRegister = (req: Request, res: Response): void => {
    //register with Full_name,username,email(verified)
    try{
        const body = _.pick(req.body, ["name", "username", "email", "password", "confirm_pass"]);
        
        if(body.password != body.confirm_pass){throw new Error('Confirm Passwords do not match')};

        const user = new User(body);

        user.save()
        .then((user:any) => {
            return user.generateAuthToken();
        })
        .then((token: string) => {
            res.header('x-auth',token).send(user);
        }).catch((err:any) => {
            res.status(400).send(err.message);
        });

    }catch(err){
        res.status(400).send(err);
    }
};

//tobe moved to middleware
export const userAuth = (req : Request, res: Response,next : NextFunction) => {
    const token : any = req.header('x-auth');

    User.verifyToken(token).then((user : any) => {
        if(!user){
            res.status(401).send('Please login');
        }
        res.send(user);
    })
    .catch((err : any) => {
        console.log(err);
    });


}

export const allUsers = async (req:Request, res: Response)=> {
    const users = await User.find();

    res.send(users);
};