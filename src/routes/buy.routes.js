import { Router} from 'express';
import { getBuy, getDetail_Buy, postBuy } from '../controllers/buy.controller.js';

//IMPORTAMOS LOS MIDDLWARE

//middlware de auth
import { checkAuth } from '../middlware/auth.js';
import { checkRolAdmin, checkRolUser } from '../middlware/roleAuth.js';

const router = Router()

router.get('/buy', checkAuth, getBuy) 
router.get('/buy/detail/:id', checkAuth, getDetail_Buy)
router.post('/buy/add/:id', checkAuth, postBuy)

export default router 