import { Router} from 'express';
import { getLogin,postLogin,getLogout } from '../controllers/login.controller.js';

import { checkAuth } from '../middlware/auth.js';
import { checkRolAdmin, checkRolUser } from '../middlware/roleAuth.js';

const router = Router()

router.get('/login', getLogin) 
router.post('/login', postLogin)
router.get('/logout', getLogout)

router.get('/a', checkAuth, (req, res) => {
    res.send('hola aaaaaaaaa')
})
router.get('/i', checkAuth, checkRolUser, (req, res) => {
    res.send('hola iiiiii')
})
router.get('/u', checkAuth, checkRolAdmin, (req, res) => {
    res.send('hola uuuuuuuuuuu')
})

export default router 