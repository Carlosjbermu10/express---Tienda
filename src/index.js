import cookieParser from 'cookie-parser';
import  express  from 'express';

//importamos las variables de entorno
import { PORT } from './config.js';

//importamos las rutas
import loginRoutes from './routes/login.routes.js'
import RegisterRoutes from './routes/register.router.js'

const app = express()

//para procesar datos enviados desde el form
app.use(express.urlencoded({extended:false}))
app.use(express.json())

//para poder trabajar con las cookies
app.use(cookieParser())

// Para eliminar el cache y que no se pueda volver con el boton de back luego que hagamos un LOGOUT
/*app.use((req, res, next) => {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    }
})*/

//seteamos variables de entorno
//dotenv.config({path:'./env/.env'})

//llamar al Router de login 
app.use(loginRoutes)
app.use(RegisterRoutes)

app.listen(PORT)
console.log('server running in the port', PORT)
