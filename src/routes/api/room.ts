import { Router, Request, Response } from 'express';

const router : any  = Router();

router.get('/',( req: Request, res: Response ) => {
    res.send('Connected');
});

const chatRoom = (io : any) => {
    
    io.on('connection',() => {
        console.log('User Connected');
    });

    return router;
} 

module.exports = chatRoom;