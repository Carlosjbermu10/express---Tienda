import { 
    returnID //Servicio que devuelve los datos del usuario por el id
} from '../services/users/login.services.js'; 

import { VerifyToken } from '../helpers/GenerateToken.js';

export const checkAuth = async (req,res,next) => {
    const token = req.header("x-auth-token");
    
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
        if (token) {
            const decodificada = await VerifyToken(token)
            const datos = await returnID(decodificada.id)
            if (!datos) {return next()}
            req.user = datos[0]
            return next()
        } else {
            res.redirect('/login')
        }
    }

}