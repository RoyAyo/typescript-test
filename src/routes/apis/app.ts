import { Router } from "express";

import { userRegister,allUsers, userLogin, userProfile } from '../../controller/userController';

import userAuth from '../../middleware/auth';

const router = Router();

router.post('/register',userRegister);

router.post('/login',userLogin);

router.get('/all', allUsers);

router.get('/profile/:username', [userAuth], userProfile);

router.post('/sendMessage',[userAuth]);

module.exports = router;