import { Router, Request, Response } from 'express';
import userAuth from '../../middleware/auth';

const router : any  = Router();

router.use(userAuth);

router.get('/',( req: Request, res: Response ) => {
    res.send('Connected');
});

router.post('/sendMessage', (req: Request, res: Response) => {
    
});

const chatRoom = (io : any) => {
    
    io.on('connection',() => {
        console.log('User Connected');
    });

    return router;
} 

module.exports = chatRoom;