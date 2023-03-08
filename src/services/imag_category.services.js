import { pool } from '../database/db.js';

export const getSerRegister = async() => {
    
    
}

//Servicio que busca si ya existe una Categoria
export const SearchCategoryId = async (id_categ) => {

    const [rows] = await pool.query('SELECT * FROM category WHERE id_category = ?', [id_categ])
    return rows.length
    
}

//Servicio que busca la imagen de una categoria por su id
export const SearchImagCategoryId = async (id_imag_categ) => {

    const [rows] = await pool.query
    ('SELECT * FROM imag_category WHERE id_imag_category = ?', [id_imag_categ])
    return rows.length
    
}

//Servicio que retorna el id_public de una imagen de una categoria
export const ReturnImagCategoryId_public = async (id_imag_categ) => {

    const [rows] = await pool.query
    ('SELECT * FROM imag_category WHERE id_imag_category = ?', [id_imag_categ])
    return rows[0].id_public
    
}

//Servicio para registrar una imagen en una Categoria
export const RegisterImagCategory = async (imag_cate) => {

    const url_imag = imag_cate.url_imag
    const id_public = imag_cate.id_public
    const id_category = imag_cate.id_category

    const [rows] = await pool.query('INSERT INTO imag_category (id_category, url_imag, id_public) VALUES(?,?,?)',
    [id_category, url_imag, id_public])
    const result = {
        id: rows.insertId,
        url_imag,
        id_public,
        id_category
    }
    return result
}

//Servicio para eliminar una imagen de una categoria
export const DeleteImagCategoryId = async (id_imag_categ) => {

    const [rows] = await pool.query
    ('DELETE FROM imag_category WHERE id_imag_category = ?', [id_imag_categ])
    return rows
    
}

