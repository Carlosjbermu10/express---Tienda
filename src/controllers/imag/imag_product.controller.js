import fs from 'fs-extra';

import { SearchProductId, //Servicio que busca si ya existe un Producto
    RegisterImagProduct, //Servicio para registrar una imagen en un Producto
    SearchImagProductId, //Servicio que busca la imagen de un Producto por su id
    ReturnImagProductId_public, //Servicio que retorna el id_public de una imagen de un Producto
    DeleteImagProductId //Servicio para eliminar una imagen de un Producto
} from '../../services/imag/imag_product.services.js';

import { uploadClo, deleteClo } from '../../helpers/cloudinary.js';

//IMPORTAMOS E UTILIZAMOS CLOUDINARY
import { cloud } from '../../helpers/cloudinary.js';


export const getImagProduct = async (req,res) => {

    res.send("Registrar Imagen de una Categoria")
}

export const postImagProduct = async (req,res) => {

    try {
        
        // se reciben la variable que viene por parametros
        const id_produ = req.params.id
        
        //se recibe la imagen en el req.file
        if (!req.file) {
            return res.send({ status:"mal",
            description:"Tiene que seleccionar una imagen",
            })
        }
        
        //Se comprueba si ya existe el producto que se pasa por los parametros
        const search = await SearchProductId(id_produ)
        if (search === 0){
            return res.send({ status:"mal",
            description:"Producto no se encuentra registrado",
            })
        }

        //Se llama el metodo que sube la imagen a cloudinary
        const result = await uploadClo(req.file.path) 
        
        //Se crea un objeto para pasarlo mas adelante
        const imag_pro = {
            id_product: id_produ,
            url_imag: result.secure_url,
            id_public: result.public_id
        };

        //se invoca el servicio para registrar una imagen de una categoria
        const imag_prod = await RegisterImagProduct(imag_pro)

        //Se borra la imagen en la ruta publica
        await fs.unlink(req.file.path)

        res.send({  status:"ok",
                    description:"Imagen de el Producto registrada correctamente",
                    data:imag_prod})
        
    } catch (error) {
        console.log(error)
    }
    
}

export const deleteImagProduct = async (req,res) => {

    try {

        const { id } = req.params

        //Se comprueba si ya existe la imagen que se pasa por los parametros
        const search_i = await SearchImagProductId(id)
        if (search_i === 0){
            return res.send({ status:"mal",
            description:"La imagen no se encuentra registrada",
            })
        }

        //Se invoca a el servicio que retorna el id_public de una imagen de una categoria
        const id_public = await ReturnImagProductId_public(id)

        //se invoca el servicio para eliminar una imagen de una categoria
        const imag_cat = await DeleteImagProductId(id)

        //Se llama a el metodo que elimina la imagen en cloudinary
        const result = await deleteClo(id_public)

        res.send({  status:"ok",
                    description:"Imagen de la Categoria ha sido borrada correctamente"})

    } catch (error) {
        console.log(error)
    }

}