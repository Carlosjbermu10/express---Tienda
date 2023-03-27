import { Router} from 'express';
import { getCategory, postCategory } from '../controllers/category.controller.js';

//IMPORTAMOS LOS MIDDLWARE

//middlware de auth
import { checkAuth } from '../middlware/auth.js';
import { checkRolAdmin, checkRolUser } from '../middlware/roleAuth.js';

const router = Router()

router.get('/category', getCategory) 
router.post('/category/add', checkAuth, postCategory)

export default router 