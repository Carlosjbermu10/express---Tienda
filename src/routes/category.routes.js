import { Router} from 'express';
import { getCategory, postCategory } from '../controllers/category.controller.js';

const router = Router()

router.get('/category', getCategory) 
router.post('/category/add',postCategory)

export default router 