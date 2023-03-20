import  express  from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

//importamos las variables de entorno
import { PORT } from './config.js';

//importamos las rutas 
import loginRoutes from './routes/users/login.routes.js'
import RegisterRoutes from './routes/users/register.routes.js'
import categoryRoutes from './routes/category.routes.js';
import imag_categoryRoutes from './routes/imag/imag_category.routes.js';
import productRoutes from './routes/product.routes.js';
import imag_productRoutes from './routes/imag/imag_product.routes.js';
import carRoutes from './routes/car.routes.js';

const app = express()

//para procesar datos enviados desde el form
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//inicializar morgan
app.use(morgan('dev'))

//para poder trabajar con las cookies
app.use(cookieParser())

// Para eliminar el cache y que no se pueda volver con el boton de back luego que hagamos un LOGOUT
/*app.use((req, res, next) => {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    }
})*/

//llamar al Router de login 
app.use(loginRoutes)
app.use(RegisterRoutes) 
app.use(categoryRoutes) 
app.use(imag_categoryRoutes) 
app.use(productRoutes)
app.use(imag_productRoutes)
app.use(carRoutes)

app.listen(PORT)
console.log('server running in the port', PORT)
