import { Router } from "express";

import { userRegister,allUsers, userAuth } from '../../controller/userController';

const router = Router();

router.post('/register',userRegister);

router.get('/checkStatus', userAuth);

router.get('/all',allUsers);

// router.post('/login', (req: Request, res: Response) => {

// });

module.exports = router;