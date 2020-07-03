import { Router } from "express";

import { userRegister,allUsers } from '../../controller/userController';

const router = Router();

router.post('/register',userRegister);

router.get('/',allUsers);

// router.post('/login', (req: Request, res: Response) => {

// });

module.exports = router;