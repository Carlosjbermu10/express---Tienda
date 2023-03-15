import { pool } from '../database/db.js';

export const getSerRegister = async() => {
    
    
}

//Servicio que busca si ya existe una Categoria por su Id
export const SearchCategoryId = async (id_categ) => {

    const [rows] = await pool.query('SELECT * FROM category WHERE id_category = ?', [id_categ])
    return rows.length
    
}


//Servicio que busca si ya existe un Producto
export const SearchProduct = async (name_product) => {

    const [rows] = await pool.query('SELECT * FROM product WHERE name_product = ?', [name_product])
    return rows.length
    
}

//Servicio para registrar un Producto
export const RegisterProduct = async (prod) => {

    const name = prod.name
    const description = prod.description
    const amount = prod.amount
    const id_cate = prod.id_cate

    const [rows] = await pool.query
    ('INSERT INTO product (name_product, description_product, amount_product, date, id_category) VALUES(?,?,?,CURDATE (),?)',
    [name, description, amount, id_cate])
    const result = {
        id: rows.insertId,
        name,
        description,
        amount,
        id_cate
    }
    return result
}