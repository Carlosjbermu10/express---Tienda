import { pool } from '../database/db.js';

export const getSerRegister = async() => {
    
    const result = await pool.query('SELECT 1 + 1 AS result')
}

//Servicio que busca si ya existe un usuario
export const SearchUser = async (user) => {

    const [rows] = await pool.query('SELECT * FROM users WHERE user = ?', [user])
    return rows.length
    
}

//Servicio para registrar un usuario
export const RegisterUser = async (regi) => {

    const name = regi.name
    const user = regi.user
    const password = regi.password

    const [rows] = await pool.query('INSERT INTO users (name, user, password) VALUES(?,?,?)',
    [name, user, password])
    const result = {
        id: rows.insertId,
        name,
        user,
        password,
    }
    return result
}