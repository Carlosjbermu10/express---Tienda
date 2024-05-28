import { pool } from "../../database/db.js";

export const getSerRegister = async () => {};

//Servicio que busca si ya existe un usuario
export const SearchUser = async (user) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE user = ?", [user]);
  return rows.length;
};

//Servicio para registrar un usuario
export const RegisterUser = async (regi) => {
  const name = regi.name;
  const user = regi.user;
  const password = regi.password;
  const rol = regi.rol;

  const [rows] = await pool.query(
    "INSERT INTO users (name, user, password, rol) VALUES(?,?,?,?)",
    [name, user, password, rol]
  );
  const result = {
    id: rows.insertId,
    name,
    user,
    password,
    rol,
  };
  return result;
};
