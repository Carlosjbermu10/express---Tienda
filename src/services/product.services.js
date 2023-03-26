import { pool } from '../database/db.js';

//Servicio que devuelve todos los productos
export const getAllProduct = async() => {
    
    const [rows] = await pool.query(`SELECT 
    p.id_product , p.name_product, p.description_product, p.date, p.price_product, c.name_category, i_p.url_imag
    FROM product as p 
    inner join category as c
    on  p.id_category = c.id_category
    inner join imag_product as i_p
    on i_p.id_product = p.id_product;`)
    return rows
}

//Servicio que busca si ya existe una Categoria por su Id
export const SearchCategoryId = async (id_categ) => {

    const [rows] = await pool.query('SELECT * FROM category WHERE id_category = ?', [id_categ])
    return rows.length
    
}

//Servicio que devuelve todos los productos de una categoria
export const getAllProductForIdCategory = async(id_categ) => {
    
    const [rows] = await pool.query(`SELECT 
    p.id_product , p.name_product, p.description_product, p.date, p.price_product, i_p.url_imag
    FROM product as p
    inner join imag_product as i_p
    WHERE id_category = ? and i_p.id_product = p.id_product;`, [id_categ])
    return rows

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
    const id_cate = prod.id_cate
    const price = prod.price
    const amount = prod.amount
    

    const [rows] = await pool.query
    ('INSERT INTO product (name_product, description_product,  date, id_category, price_product, amount_product) VALUES(?,?,CURDATE (),?,?,?)',
    [name, description, id_cate, price, amount])
    const result = {
        id: rows.insertId,
        name,
        description,
        price,
        amount,
        id_cate
    }
    return result
}