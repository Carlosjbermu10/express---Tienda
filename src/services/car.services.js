import { pool } from '../database/db.js';

export const getSerRegister = async() => {
    
    
}

//Servicio que busca si ya existe un Producto
export const SearchProductId = async (id_prod) => {

    const [rows] = await pool.query('SELECT * FROM product WHERE id_product = ?', [id_prod])
    return rows.length
    
}

//Servicio que busca si ya existe un usuario por el Id
export const SearchUserId = async (id) => {

    const [rows] = await pool.query('SELECT * FROM users WHERE id_users = ?', [id])
    return rows.length
    
}

//Servicio que busca si ya existe un Producto en un carrito de una persona
export const SearchProduct_Car = async (id_users, id_product) => {

    const [rows] = await pool.query
    ('SELECT * FROM car WHERE id_users = ? and id_product = ?', [id_users, id_product])
    return rows.length
    
}

//Servicio para añadir un producto a un carrito de compra
export const RegisterCar = async (ca) => {

    const amount_car = ca.amount_car
    const id_users = ca.id_users
    const id_product = ca.id_prod

    const [rows] = await pool.query
    ('INSERT INTO car (amount_car, id_users,  id_product) VALUES(?,?,?)',
    [amount_car, id_users, id_product])
    const result = {
        id: rows.insertId,
        amount_car,
        id_users,
        id_product
    }
    return result
}