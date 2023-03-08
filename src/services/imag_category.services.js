import { pool } from '../database/db.js';

export const getSerRegister = async() => {
    
    
}

//Servicio que busca si ya existe una Categoria
export const SearchCategoryId = async (id_categ) => {

    const [rows] = await pool.query('SELECT * FROM category WHERE id_category = ?', [id_categ])
    return rows.length
    
}

//Servicio para registrar una Categoria
export const RegisterImagCategory = async (imag_cate) => {

    const id_category = imag_cate.id_category
    const url_imag = imag_cate.url_imag
    const id_public = imag_cate.id_public

    const [rows] = await pool.query('INSERT INTO imag_category (id_category, url_imag, id_public) VALUES(?,?,?)',
    [id_category, url_imag, id_public])
    const result = {
        id_category,
        url_imag,
        id_public
    }
    return result
}