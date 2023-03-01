import { 
    returnID //Servicio que devuelve los datos del usuario por el id
} from '../services/login.services.js';

import { VerifyToken } from '../helpers/GenerateToken.js';

export const checkAuth = async (req,res,next) => {
    
    if (req.cookies.jwt) {
        try {

            const decodificada = await VerifyToken(req)
            const datos = await returnID(decodificada.id)
            if (!datos) {return next()}
            req.user = datos[0]
            return next()

        } catch (error) {
            console.log(error)
        }    
    }else{
        res.redirect('/login')
    }

}