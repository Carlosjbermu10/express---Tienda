import {config} from 'dotenv';

config({path:'./env/.env'})

export const PORT = process.env.PORT || 3000
/*
//bd
export const BD_USER = process.env.BD_USER || 'root'
export const BD_PASSWORD = process.env.DB_PASSWORD || '1234'
export const BD_HOST = process.env.DB_HOST || 'localhost'
export const BD_DATABASE = process.env.DB_DATABASE || 'bd_tienda'
export const BD_PORT = process.env.DB_PORT || 3306
*/
//bd
export const BD_USER = process.env.BD_USER || 'root'
export const BD_PASSWORD = process.env.DB_PASSWORD || 'hjDKssYxLmkz5lqMQzez'
export const BD_HOST = process.env.DB_HOST || 'containers-us-west-181.railway.app'
export const BD_DATABASE = process.env.DB_DATABASE || 'railway'
export const BD_PORT = process.env.DB_PORT || 5830

//jwt
export const JWT_SECRET = process.env.JWT_SECRET || '12345'
export const JWT_TIEMPO_EXPIRA = process.env.JWT_TIEMPO_EXPIRA || '7d'
export const JWT_COOKIE_EXPIRES = process.env.JWT_COOKIE_EXPIRES || '90'

