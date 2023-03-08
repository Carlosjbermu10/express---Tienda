import { Router} from 'express';
import { getImagCategory, postImagCategory, deleteImagCategory } from '../controllers/imag_category.controller.js';

//IMPORTAMOS LOS MIDDLWARE

//middlware de multer
import { upload } from '../middlware/multer.js';

const router = Router()

router.get('/imag_category', getImagCategory) 
router.post('/imag_category/add/:id',upload ,postImagCategory)
router.delete('/imag_category/delete/:id', deleteImagCategory) 

export default router 