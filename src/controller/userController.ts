import {Request, Response} from 'express';
import * as _ from "lodash";

import User from '../models/userModel';

export const userRegister = (req: Request, res: Response): void => {
    //register with Full_name,username,email(verified)
    try{
        const body = _.pick(req.body, ["name", "username", "email", "password", "confirm_pass"]);
        
        if(body.password != body.confirm_pass){throw new Error('Confirm Passwords do not match')};

        const user = new User(body);

        user.save().then(user => {
            res.send(user);
        }).catch((err) => {
            res.status(400).send(err.message);
        });

        return;
    }catch(err){
        res.status(400).send(err);
    }
};


export const allUsers = async (req:Request, res: Response)=> {
    const users = await User.find();

    res.send(users);
};