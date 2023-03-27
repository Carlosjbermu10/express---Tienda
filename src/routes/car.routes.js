import { Router} from 'express';
import { getCar, postCar, deleteCar } from '../controllers/car.controller.js';

//IMPORTAMOS LOS MIDDLWARE

//middlware de auth
import { checkAuth } from '../middlware/auth.js';
import { checkRolAdmin, checkRolUser } from '../middlware/roleAuth.js';

const router = Router()

router.get('/car', checkAuth, getCar) 
router.post('/car/add/:id', checkAuth, postCar)
router.delete('/car/delete/:id', checkAuth, deleteCar)

export default router 