import { SearchCategoryId, RegisterImagCategory } from '../services/imag_category.services.js';

//IMPORTAMOS E UTILIZAMOS CLOUDINARY
import { cloud } from '../helpers/cloudinary.js';
import cloudinary from 'cloudinary';

export const getRegister = async (req,res) => {

    res.send("Registrar Imagen de una Categoria")
}

export const postRegister = async (req,res) => {

    try {
        
        //se recibe la imagen en el req.file
        const id_categ = req.params.id
        if (!req.file) {
            return res.send({ status:"mal",
            description:"Tiene que seleccionar una imagen",
            })
        }
        
        //Se comprueba si ya existe la categoria que se pasa por los parametros
        const search = await SearchCategoryId(id_categ)
        if (search === 0){
            return res.send({ status:"mal",
            description:"Categoria no se encuentra registrada",
            })
        }

        //Se sube la imagen a cloudinary
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        
        //Se crea un objeto para pasarlo mas adelante
        const imag_cate = {
            id_category: id_categ,
            url_imag: result.secure_url,
            id_public: result.public_id
        };

        //se invoca el servicio para registrar un usuario
        const imag_cat = await RegisterImagCategory(imag_cate)

        res.send({  status:"ok",
                    description:"Imagen de la Categoria registrada correctamente",
                    data:imag_cat})
        
    } catch (error) {
        console.log(error)
    }
    
}