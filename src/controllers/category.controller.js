import { SearchCategory,RegisterCategory } from '../services/category.services.js';

export const getCategory = async (req,res) => {

    res.send("Registrar Categoria")
}


export const postCategory = async (req,res) => {

    try {
        
        //se reciben las variables en el req.body
        const { body } = req
        if (!body.name_category|| !body.description_category) {
            return res.send({ status:"mal",
            description:"le falto ingresar un dato",
            })
        }
        
        //Se comprueba si ya existe la categoria
        const search = await SearchCategory(body.name_category)
        if (search > 0){
            return res.send({ status:"mal",
            description:"Categoria ya registrado",
            })
        }
        
        //Se crea un objeto para pasarlo mas adelante
        const cate = {
            name: body.name_category,
            description: body.description_category
        };

        //se invoca el servicio para registrar un usuario
        const cat = await RegisterCategory(cate)

        res.send({  status:"ok",
                    description:"Categoria registrada correctamente",
                    data:cat})
        
    } catch (error) {
        console.log(error)
    }
    
}