import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import { JWT_SECRET,JWT_TIEMPO_EXPIRA } from '../config.js';

export const TokenSign = async (user) => {
    return jwt.sign(
        {
            id: user.idusers,
            rol: user.rol
        },
        JWT_SECRET,
        {
            expiresIn:JWT_TIEMPO_EXPIRA
        }
    )
}

export const VerifyToken = async (req) => {
    try {
        return promisify(jwt.verify)(req.cookies.jwt, JWT_SECRET)
    } catch (error) {
        console.log(error)
        return null
    }
}