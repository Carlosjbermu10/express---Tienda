import { Router} from 'express';
import { getLogin,postLogin,isAuthenticated,getLogout } from '../controllers/login.controller.js';

const router = Router()

router.get('/login', getLogin) 
router.post('/login', postLogin)
router.get('/logout', getLogout)
router.get('/i', isAuthenticated, (req, res) => {
    res.send('hola')
})

export default router 