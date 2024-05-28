import {
  SearchUser, //Servicio que busca si ya existe un usuario
  ValidatePassword, //Servicio que valida la contraseña del usuario con la de la bd
  returnUser, //Servicio que devuelve los datos del usuario que se loguea
  returnID, //Servicio que devuelve los datos del usuario por el id
} from "../../services/users/login.services.js";

import { TokenSign } from "../../helpers/GenerateToken.js";

import { cookiesOp } from "../../helpers/GenerateCookie.js";

export const getLogin = async (req, res) => {
  res.send("login");
};

export const postLogin = async (req, res) => {
  try {
    //se reciben las variables en el req.body
    const { body } = req;
    if (!body.user || !body.password) {
      return res.send({
        status: "mal",
        description: "le falto ingresar un dato",
      });
    }

    //Se comprueba si ya existe el usuario
    const search = await SearchUser(body.user);
    if (search == 0) {
      return res.send({ status: "mal", description: "usuario No registrado" });
    }

    //Se comprueba si la contraseña es la correcta
    const validate = await ValidatePassword(body.user, body.password);
    if (validate === false) {
      return res.send({ status: "mal", description: "Contraseña Incorrecta" });
    }

    //Inicio de sesion
    const datos = await returnUser(body.user);
    //se crea el token
    const token = await TokenSign(datos[0]);
    const cookiesOptions = cookiesOp;
    res.cookie("jwt", token, cookiesOptions);
    return res.send({
      status: "ok",
      description: "usuario logueado exitosamente",
      data: datos,
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getLogout = async (req, res, next) => {
  res.clearCookie("jwt");
  //return res.redirect('/')
  return res.send("seccion cerrada");
};
