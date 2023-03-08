import { Router} from 'express';
import { getRegister,postRegister } from '../controllers/category.controller.js';

const router = Router()

router.get('/category', getRegister) 
router.post('/addcategory',postRegister)

export default router 