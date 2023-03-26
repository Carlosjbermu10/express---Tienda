import { getAllProduct, //Servicio que devuelve todos los productos
    getAllProductForIdCategory, //Servicio que devuelve todos los productos de una categoria
    SearchCategoryId, //Servicio que busca si ya existe una Categoria por su Id
    SearchProduct , //Servicio que busca si ya existe un Producto
    RegisterProduct //Servicio para registrar un Producto
} from '../services/product.services.js';

export const getProduct = async (req,res) => {
    
    try {

        //se invoca el servicio que devuelve todos los productos
        const pro = await getAllProduct()

        res.send({  status:"ok",
                    description:"Lista de productos",
                    data:pro})

    } catch (error) {
        console.log(error)
    }

}

export const getProductForIdCategory = async (req,res) => {
    
    try {

        // se reciben la variable que viene por parametros
        const id_categ = req.params.id

        //Se comprueba si ya existe la categoria
        const search = await SearchCategoryId(id_categ)
        if (search === 0){
            return res.send({ status:"mal",
            description:"Categoria no registrada",
            })
        }

        //se invoca el servicio que devuelve todos los productos
        const prod = await getAllProductForIdCategory(id_categ)

        res.send({  status:"ok",
                    description:"Lista de productos",
                    data:prod})
    } catch (error) {
        console.log(error)
    }

}


export const postProduct = async (req,res) => {

    try {
        
        // se reciben la variable que viene por parametros
        const id_categ = req.params.id
        
        //se reciben las variables en el req.body
        const { body } = req
        if (!body.name_product || !body.description_product || !body.price_product || !body.amount_product) {
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
            price: body.price_product,
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