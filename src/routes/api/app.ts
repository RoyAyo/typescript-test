import { Router } from "express";

import { userRegister,allUsers, userLogin, userProfile, adminProfile } from '../../controller/userController';

import adminAuth from '../../middleware/auth';
import userAuth from '../../middleware/auth';

const router = Router();

router.post('/register',userRegister);

router.post('/login',userLogin);

router.get('/all', allUsers);

router.get('/profile/:username', [userAuth], userProfile);

router.get('/admin',[adminAuth],adminProfile);


module.exports = router;