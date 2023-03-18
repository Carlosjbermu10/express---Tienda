import fs from 'fs-extra';

import { SearchCategoryId, RegisterImagCategory, SearchImagCategoryId, ReturnImagCategoryId_public,
    DeleteImagCategoryId} from '../../services/imag/imag_category.services.js';

import { uploadClo, deleteClo } from '../../helpers/cloudinary.js';

//IMPORTAMOS E UTILIZAMOS CLOUDINARY
import { cloud } from '../../helpers/cloudinary.js';


export const getImagCategory = async (req,res) => {

    res.send("Registrar Imagen de una Categoria")
}

export const postImagCategory = async (req,res) => {

    try {
        
        // se reciben la variable que viene por parametros
        const id_categ = req.params.id
        
        //se recibe la imagen en el req.file
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

        //Se llama el metodo que sube la imagen a cloudinary
        const result = await uploadClo(req.file.path) 
        
        //Se crea un objeto para pasarlo mas adelante
        const imag_cate = {
            id_category: id_categ,
            url_imag: result.secure_url,
            id_public: result.public_id
        };

        //se invoca el servicio para registrar una imagen de una categoria
        const imag_cat = await RegisterImagCategory(imag_cate)

        //Se borra la imagen en la ruta publica
        await fs.unlink(req.file.path)

        res.send({  status:"ok",
                    description:"Imagen de la Categoria registrada correctamente",
                    data:imag_cat})
        
    } catch (error) {
        console.log(error)
    }
    
}

export const deleteImagCategory = async (req,res) => {

    try {

        const { id } = req.params

        //Se comprueba si ya existe la imagen que se pasa por los parametros
        const search = await SearchImagCategoryId(id)
        if (search === 0){
            return res.send({ status:"mal",
            description:"La imagen no se encuentra registrada",
            })
        }

        //Se invoca a el servicio que retorna el id_public de una imagen de una categoria
        const id_public = await ReturnImagCategoryId_public(id)

        //se invoca el servicio para eliminar una imagen de una categoria
        const imag_cat = await DeleteImagCategoryId(id)

        //Se llama a el metodo que elimina la imagen en cloudinary
        const result = await deleteClo(id_public)

        res.send({  status:"ok",
                    description:"Imagen de la Categoria ha sido borrada correctamente"})

    } catch (error) {
        console.log(error)
    }

}