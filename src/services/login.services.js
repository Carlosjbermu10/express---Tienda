import { pool } from '../database/db.js';
import bcryptjs from 'bcryptjs';

//Servicio que busca si ya existe un usuario
export const SearchUser = async (user) => {

    const [rows] = await pool.query('SELECT * FROM users WHERE user = ?', [user])
    return rows.length
    
}

//Servicio que valida la contraseña del usuario con la de la bd
export const ValidatePassword = async (user,password) => {

    const [rows] = await pool.query('SELECT * FROM users WHERE user = ?', [user])
    return (await bcryptjs.compare(password, rows[0].password)) 

}

//Servicio que devuelve los datos del usuario que se loguea
export const returnUser = async (user) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE user = ?', [user])
    return rows
}

//Servicio que devuelve los datos del usuario por el id
export const returnID = async (id) => {
    const [rows] = await pool.query('SELECT * FROM users WHERE id_users = ?', [id])
    return rows
}