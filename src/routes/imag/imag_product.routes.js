import { Router} from 'express';
import { getImagProduct, postImagProduct, deleteImagProduct } 
from '../../controllers/imag/imag_product.controller.js';

//IMPORTAMOS LOS MIDDLWARE

//middlware de multer
import { upload } from '../../middlware/multer.js';

const router = Router()

router.get('/imag_product', getImagProduct) 
router.post('/imag_product/add/:id',upload ,postImagProduct)
router.delete('/imag_product/delete/:id', deleteImagProduct) 

export default router 