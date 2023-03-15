import { Router} from 'express';
import { getProduct, postProduct } from '../controllers/product.controller.js';

const router = Router()

router.get('/product', getProduct) 
router.post('/product/add/:id',postProduct)

export default router 