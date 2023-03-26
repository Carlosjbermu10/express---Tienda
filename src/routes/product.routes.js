import { Router} from 'express';
import { getProduct, postProduct } from '../controllers/product.controller.js';

//IMPORTAMOS LOS MIDDLWARE

//middlware de auth
import { checkAuth } from '../middlware/auth.js';
import { checkRolAdmin, checkRolUser } from '../middlware/roleAuth.js';

const router = Router()

router.get('/product', checkAuth, getProduct) 
router.post('/product/add/:id', checkAuth, postProduct)

export default router 