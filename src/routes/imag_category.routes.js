import { Router} from 'express';
import { getRegister,postRegister } from '../controllers/imag_category.controller.js';

//IMPORTAMOS LOS MIDDLWARE

//middlware de multer
import { upload } from '../middlware/multer.js';

const router = Router()

router.get('/imag_category', getRegister) 
router.post('/add_imag_category/:id',upload ,postRegister)

export default router 