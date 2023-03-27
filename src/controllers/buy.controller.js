import { VerifyToken } from '../helpers/GenerateToken.js';

import { getAllBuyForUser, //Servicio que devuelve todas las compras del usuario que inicio seccion
    SearchBuyId, //Servicio que busca si ya existe una Compra por el Id
    getDetailBuy, //Servicio que devuelve los detalles de una compra
    SearchPayId, //Servicio que busca si ya existe un tipo de pago por el Id
    SearchUserId, //Servicio que busca si ya existe un usuario por el Id
    Total_Buy, //Servicio que devuelve el monto total a pagar en una compra
    RegisterBuy, //Servicio que registra una compra
    Data_Products, //Servicio que devuelve los datos de los productos que se estan comprando
    RegisterDetail_buy //Servicio que registra los detalles de una compra
    } from '../services/buy.services.js';

export const getBuy = async (req,res) => {

    try {

        //Se invoca a el metodo que devuelve todas las compras de el usuario registrado
        const allbuyUser = await getAllBuyForUser()

        res.send({  status:"ok",
                    description:"Lista de Compras",
                    data:allbuyUser})

    } catch (error) {
        
    }
    
}

export const getDetail_Buy = async (req,res) => {

    try {

        // se reciben la variable que viene por parametros
        const id_buy = req.params.id
        //Se comprueba si ya existe esa compra
        const search_buy = await SearchBuyId(id_buy)
        if (search_buy == 0){
            return res.send({ status:"mal",
            description:"Compra no registrada",
            })
        }

        //Se invoca a el metodo que devuelve todas los detalles de una compra
        const detail_buy = await getDetailBuy()

        res.send({  status:"ok",
                    description:"Detalles de compra",
                    data:detail_buy})

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

        //se invoca el servicio para registrar la compra de un usuario
        const buy = await RegisterBuy(bu)

        //Se invoca el servicio que devuelve los productos que se estan comprando
        let produ_buy = await Data_Products(decodificada.id)
        const all_produ = produ_buy.map(element => {
            return{ 
                id_buys: buy.id,
                id_product: element.id_product,
                name: element.name_product,
                price: element.price_product,
                amount: element.amount_car
            }
        })

        //Se invoca a el metodo de pago 
        

        //Se invoca el servicio que registra los detalles de una compra
        const detail_buy = await  RegisterDetail_buy(all_produ)

        res.send({  status:"ok",
                    description:"Compra registrada correctamente",
                    data:buy})
        
    } catch (error) {
        console.log(error)
    }
    
}