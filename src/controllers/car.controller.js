import { VerifyToken } from '../helpers/GenerateToken.js';

import { getCar_Users_Products, //Servicio que devuelve los productos que tiene el usuario que inicio seccion en el carrito
    SearchProductId, //Servicio que busca si ya existe un Producto
    SearchUserId , //Servicio que busca si ya existe un usuario por el Id
    SearchProduct_Car, //Servicio que busca si ya existe un Producto en un carrito de una persona
    RegisterCar //Servicio para añadir un producto a un carrito de compra
} from '../services/car.services.js';

export const getCar = async (req,res) => {
    
    try {

        //Se busca el id del usuario que inicio seccion por el token que esta en la cookie
        const decodificada = await VerifyToken(req)

        //Se comprueba si ya existe el usuario
        const search_user = await SearchUserId(decodificada.id)
        if (search_user == 0){
            return res.send({ status:"mal",
            description:"Usuario No registrado",
            })
        }

        //Se buscan todos los productos que estan el carrito de compra del usuario que inicio seccion
        const search_car = await getCar_Users_Products(decodificada.id)

        res.send({  status:"ok",
                        description:"Productos que estan en el carrito de compra",
                        data:search_car})

    } catch (error) {
        console.log(error)
    }
    
}

export const postCar = async (req,res) => {

    try {
        
        // se reciben la variable que viene por parametros
        const id_prod = req.params.id
        
        //se reciben las variables en el req.body
        const { body } = req
        if (!body.amount_car) {
            return res.send({ status:"mal",
            description:"le falto ingresar un dato",
            })
        }
        
        //Se comprueba si ya existe el producto
        const search_pro = await SearchProductId(id_prod)
        if (search_pro === 0){
            return res.send({ status:"mal",
            description:"Producto no registrado",
            })
        }
        
        //Se busca el id del usuario que inicio seccion por el token que esta en la cookie
        const decodificada = await VerifyToken(req)

        //Se comprueba si ya existe el usuario
        const search_user = await SearchUserId(decodificada.id)
        if (search_user == 0){
            return res.send({ status:"mal",
            description:"usuario No registrado",
            })
        }

        //Se comprueba que un producto no este añadido 2 veces en el carrito de una persona
        const search_car_prod = await SearchProduct_Car(decodificada.id, id_prod)
        if (search_car_prod > 0){
            return res.send({ status:"mal",
            description:"El producto ya esta añadido a carrito",
            })
        }


        //Se crea un objeto para pasarlo mas adelante
        const ca = {
            amount_car: body.amount_car,
            id_users: decodificada.id,
            id_prod: id_prod
        };
        
        //se invoca el servicio para registrar un usuario
        const car = await RegisterCar(ca)

        res.send({  status:"ok",
                    description:"Producto registrada correctamente",
                    data:car})
        
    } catch (error) {
        console.log(error)
    }
    
}