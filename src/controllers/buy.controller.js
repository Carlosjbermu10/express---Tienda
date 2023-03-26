import { VerifyToken } from '../helpers/GenerateToken.js';

import { SearchPayId, //Servicio que busca si ya existe un tipo de pago por el Id
    SearchUserId, //Servicio que busca si ya existe un usuario por el Id
    Total_Buy, //Servicio que devuelve el monto total a pagar en una compra
    RegisterBuy, //Servicio que registra una compra
    Data_Products //Servicio que devuelve los datos de los productos que se estan comprando
    } from '../services/buy.services.js';

export const getBuy = async (req,res) => {

    try {
        res.send("Registrar Categoria")
    } catch (error) {
        
    }
    
}


export const postBuy = async (req,res) => {

    try {
        
        // se reciben la variable que viene por parametros
        const id_pay = req.params.id

        //Se comprueba si ya existe ese pago
        const search_pay = await SearchPayId(id_pay)
        if (search_pay == 0){
            return res.send({ status:"mal",
            description:"Metodo de pago no registrado",
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

        const total = await Total_Buy(decodificada.id)

        console.log(total)
        
        //Se crea un objeto para pasarlo mas adelante
        const bu = {
            total: total.total,
            id_users: decodificada.id,
            id_pay: id_pay
        };

        //se invoca el servicio para registrar un usuario
        const buy = await RegisterBuy(bu)

        //Se invoca el servicio que devuelve los productos que se estan comprando
        let produ_buy = await Data_Products(decodificada.id)
        const buuy = produ_buy.map(element => {
            return{ 
                id_id_buy : buy.id,
                
            }
        })
        console.log(buuy)

        /*res.send({  status:"ok",
                    description:"Categoria registrada correctamente",
                    data:buy})*/
        
    } catch (error) {
        console.log(error)
    }
    
}