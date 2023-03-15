import { SearchCategoryId, SearchProduct , RegisterProduct } from '../services/product.services.js';

export const getProduct = async (req,res) => {
    
    res.send("Registrar Producto")
}


export const postProduct = async (req,res) => {

    try {
        
        // se reciben la variable que viene por parametros
        const id_categ = req.params.id
        
        //se reciben las variables en el req.body
        const { body } = req
        if (!body.name_product || !body.description_product || !body.amount_product) {
            return res.send({ status:"mal",
            description:"le falto ingresar un dato",
            })
        }
        
        //Se comprueba si ya existe la categoria
        const search = await SearchCategoryId(id_categ)
        if (search === 0){
            return res.send({ status:"mal",
            description:"Categoria no registrada",
            })
        }

        //Se comprueba si ya existe el Producto
        const searchPro = await SearchProduct(body.name_product)
        if (searchPro > 0){
            return res.send({ status:"mal",
            description:"Producto ya registrada",
            })
        }

        //Se crea un objeto para pasarlo mas adelante
        const prod = {
            name: body.name_product,
            description: body.description_product,
            amount: body.amount_product,
            id_cate: id_categ
        };
        
        //se invoca el servicio para registrar un usuario
        const pro = await RegisterProduct(prod)

        res.send({  status:"ok",
                    description:"Producto registrada correctamente",
                    data:pro})
        
    } catch (error) {
        console.log(error)
    }
    
}