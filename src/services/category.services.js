import { pool } from '../database/db.js';

//Servicio que devuelve todas las categorias
export const getAllCategory = async() => {
    
    const [rows] = await pool.query(`SELECT 
    c.id_category ,c.name_category, c.description_category, i_c.url_imag
    FROM category as c
    inner join imag_category as i_c
    on i_c.id_category = c.id_category;
    `)
    return rows

}

//Servicio que busca si ya existe una Categoria
export const SearchCategory = async (name_category) => {

    const [rows] = await pool.query('SELECT * FROM category WHERE name_category = ?', [name_category])
    return rows.length
    
}

//Servicio para registrar una Categoria
export const RegisterCategory = async (cate) => {

    const name = cate.name
    const description = cate.description

    const [rows] = await pool.query('INSERT INTO category (name_category, description_category) VALUES(?,?)',
    [name, description])
    const result = {
        id: rows.insertId,
        name,
        description
    }
    return result
}