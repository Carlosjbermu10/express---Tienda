import { pool } from '../database/db.js';

//Servicio que devuelve todas las categorias
export const getAllCategory = async() => {
    
    
}

//Servicio que busca si ya existe un tipo de pago por el Id
export const SearchPayId = async (id) => {

    const [rows] = await pool.query('SELECT * FROM pay WHERE id_pay = ?', [id])
    return rows.length
    
}

//Servicio que busca si ya existe un usuario por el Id
export const SearchUserId = async (id) => {

    const [rows] = await pool.query('SELECT * FROM users WHERE id_users = ?', [id])
    return rows.length
    
}

//Servicio que devuelve el monto total a pagar en una compra
export const Total_Buy = async (id) => {

    const [rows] = await pool.query(`SELECT sum(p.price_product* c.amount_car) as total
        FROM car as c inner join product as p
        where id_users = ? and  c.id_product = p.id_product;`, [id])
    return rows[0]
    
}

//Servicio que registra una compra
export const RegisterBuy = async (bu) => {

    const total = bu.total
    const id_users = bu.id_users
    const id_pay = bu.id_pay

    const [rows] = await pool.query
    ('INSERT INTO buys (total, date, id_users, id_pay) VALUES(?,CURDATE (),?,?)',
    [total, id_users, id_pay])
    const result = {
        id: rows.insertId,
        total,
        id_users,
        id_pay
    }
    return result
}

//Servicio que devuelve los datos de los productos que se estan comprando
export const Data_Products = async (id) => {

    const [rows] = await pool.query(`SELECT 
    p.id_product, p.name_product, p.price_product, c.amount_car
    FROM car as c inner join product as p
    where id_users = ? and  c.id_product = p.id_product;`, [id])
    return rows
    
}

//Servicio que registra los detalles de una compra
export const RegisterDetail_buy = async (produ_buy) => {

    produ_buy.forEach(async (element) => {

        const id_buys = element.id_buys
        const id_product = element.id_product
        const name = element.name
        const price = element.price
        const amount = element.amount

        const [rows] = await pool.query
        ('INSERT INTO detail_buys (amount, price, id_buys, id_product, name) VALUES(?,?,?,?,?)',
        [amount, price, id_buys, id_product, name])
        const result = {
            id: rows.insertId,
            amount,
            price,
            id_buys,
            id_product,
            name
        }
        return result

    })
    
}
