import bcryptjs from "bcryptjs";
import {
  RegisterUser,
  SearchUser,
} from "../../services/users/register.services.js";

import { TokenSign } from "../../helpers/GenerateToken.js";

import { cookiesOp } from "../../helpers/GenerateCookie.js";

export const getRegister = (req, res) => {
  res.send("Registrar Usuario");
};

export const postRegister = async (req, res) => {
  try {
    //Se guarda en la variable "body" todos lo valores de "req"
    const { body } = req;

    //se reciben las variables en el req.body
    if (!body.name || !body.user || !body.password || !body.rol) {
      return res.send({
        status: "mal",
        description: "le falto ingresar un dato",
      });
    }

    //se comprueba que el rol sea el valor "admin" o "user"
    if (body.rol != "user" && body.rol != "admin") {
      return res.send({
        status: "mal",
        description: "ese rol no es permitido",
      });
    }

    //Se comprueba si ya existe el usuario
    const search = await SearchUser(body.user);
    if (search > 0) {
      return res.send({ status: "mal", description: "usuario ya registrado" });
    }

    //Se encripta el password
    const passHasd = await bcryptjs.hash(body.password, 8);

    //Se crea un objeto para pasarlo mas adelante
    const regi = {
      name: body.name,
      user: body.user,
      password: passHasd,
      rol: body.rol,
    };

    //se invoca el servicio para registrar un usuario
    const reg = await RegisterUser(regi);

    //Inicio de sesion
    //se crea el token
    const token = await TokenSign(reg);
    const cookiesOptions = cookiesOp;
    res.cookie("jwt", token, cookiesOptions);

    res.send({
      status: "ok",
      description: "usuario registrado correctamente",
      data: reg,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};
