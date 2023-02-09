import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { SearchUser, //Servicio que busca si ya existe un usuario
    ValidatePassword, //Servicio que valida la contraseña del usuario con la de la bd
    returnUser, //Servicio que devuelve los datos del usuario que se loguea
    returnID //Servicio que devuelve los datos del usuario por el id
} from '../services/login.services.js';

import { JWT_SECRET,JWT_TIEMPO_EXPIRA,JWT_COOKIE_EXPIRES} from '../config.js';

export const getLogin = async (req,res) => {

    res.send("login")
}

export const postLogin = async (req,res) => {
    
    try {
        
        //se reciben las variables en el req.body
        const { body } = req
        if (!body.user|| !body.password) {
            return res.send({ status:"mal", 
            description:"le falto ingresar un dato"
            })
        }

        //Se comprueba si ya existe el usuario
        const search = await SearchUser(body.user)
        if (search == 0){
            return res.send({ status:"mal",
            description:"usuario No registrado",
            })
        }

        //Se comprueba si la contraseña es la correcta
        const validate = await ValidatePassword(body.user, body.password)
        if (validate===false) {
            return res.send({ status:"mal",
            description:"Contraseña Incorrecta",
            })
        }
        
        //Inicio de sesion
        const datos = await returnUser(body.user)
        const id = datos[0].idusers
        //se crea el token
        const token = jwt.sign({id:id},JWT_SECRET,{expiresIn:JWT_TIEMPO_EXPIRA})
        const cookiesOptions = { 
            expiresIn: new Date (Date.now() + JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true
        }
        res.cookie('jwt', token, cookiesOptions)
        return res.send({ status:"ok",
            description:"usuario logueado exitosamente",
            data:datos,
            token:token})


    } catch (error) {
        console.log(error)
    }

}

export const isAuthenticated = async (req,res, next) => {

    if (req.cookies.jwt) {
        try {
        
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, JWT_SECRET)
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

export const getLogout = async (req,res, next) => {

    res.clearCookie('jwt')
    return res.redirect('/')

}