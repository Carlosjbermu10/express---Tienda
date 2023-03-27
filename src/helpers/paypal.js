export const paypal = async (total) => {
    return jwt.sign(
        {
            id: user.id_users,
            rol: user.rol
        },
        JWT_SECRET,
        {
            expiresIn:JWT_TIEMPO_EXPIRA
        }
    )
}