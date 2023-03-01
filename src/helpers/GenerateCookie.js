import { JWT_COOKIE_EXPIRES } from '../config.js';

export const cookiesOp = { 
    expiresIn: new Date (Date.now() + JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
    httpOnly: true
}