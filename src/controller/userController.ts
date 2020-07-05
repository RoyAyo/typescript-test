import {Request, Response} from 'express';
import * as _ from "lodash";

import User from '../models/userModel';


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

export const userLogin = (req: Request, res: Response): void => {
    //register with Full_name,username,email(verified)
    try {
        const body = _.pick(req.body, ["username","password"]);

        User.findOne({
            username : body.username,
            password : body.password
        }).then((user : any) => {
            if(user){
                return user.generateAuthToken();
            }
            res.send(400);
        }).then((token: string) => {
            res.header('x-auth',token).send('done');
        }).catch((err:any) => {
            console.log(err.message);
        });
    } catch (err) {
        res.send(500);
    }
};

export const allUsers = async (req:Request, res: Response)=> {
    const users = await User.find();

    res.send(users);
};

export const userProfile = async (req: Request, res:Response) => {
    const user = req.body.user;

    res.send(user);
}