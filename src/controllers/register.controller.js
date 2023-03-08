import bcryptjs from 'bcryptjs';
import { RegisterUser,SearchUser } from '../services/register.services.js';

export const getRegister = (req,res) => {
    
    res.send("Registrar Usuario")
}

export const postRegister = async (req,res) => {

    try {
        
        //se reciben las variables en el req.body
        const { body } = req
        if (!body.name|| !body.user|| !body.password || !body.rol) {
            return res.send({ status:"mal",
            description:"le falto ingresar un dato",
            })
        }
        
        //Se comprueba si ya existe el usuario
        const search = await SearchUser(body.user)
        if (search > 0){
            return res.send({ status:"mal",
            description:"usuario ya registrado",
            })
        }

        //Se encripta el password
        const passHasd = await bcryptjs.hash(body.password,8)
        
        //Se crea un objeto para pasarlo mas adelante
        const regi = {
            name: body.name,
            user: body.user,
            password: passHasd,
            rol: body.rol
        };

        //se invoca el servicio para registrar un usuario
        const reg = await RegisterUser(regi)

        res.send({  status:"ok",
                    description:"usuario registrado correctamente",
                    data:reg})
        
    } catch (error) {
        console.log(error)
    }
    
}