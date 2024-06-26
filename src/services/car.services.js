import { pool } from "../database/db.js";

//Servicio que devuelve los productos que tiene el usuario que inicio seccion en el carrito
export const getCar_Users_Products = async (id_users) => {
  const [rows] = await pool.query(
    `SELECT 
    c.id_car, p.id_product, p.name_product, p.description_product, p.date, p.price_product, c.amount_car, i_p.url_imag
    FROM imag_product as i_p 
    inner join product as p
    on p.id_product = i_p.id_product
    inner join car as c
    where id_users = ? and  c.id_product = p.id_product;`,
    [id_users]
  );
  return rows;
};

//Servicio que devuelve el monto total a pagar en una compra
export const Total_Buy = async (id) => {
  const [rows] = await pool.query(
    `SELECT sum(p.price_product* c.amount_car) as total
        FROM car as c inner join product as p
        where id_users = ? and  c.id_product = p.id_product;`,
    [id]
  );
  return rows[0];
};

//Servicio que busca si ya existe un Producto
export const SearchProductId = async (id_prod) => {
  const [rows] = await pool.query(
    "SELECT * FROM product WHERE id_product = ?",
    [id_prod]
  );
  return rows.length;
};

//Servicio que busca si ya existe un usuario por el Id
export const SearchUserId = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id_users = ?", [
    id,
  ]);
  return rows.length;
};

//Servicio que busca si ya existe un Producto en un carrito de una persona
export const SearchProduct_Car = async (id_users, id_product) => {
  const [rows] = await pool.query(
    "SELECT * FROM car WHERE id_users = ? and id_product = ?",
    [id_users, id_product]
  );
  return rows.length;
};

//Servicio para añadir un producto a un carrito de compra
export const RegisterCar = async (ca) => {
  const amount_car = ca.amount_car;
  const id_users = ca.id_users;
  const id_product = ca.id_prod;

  const [rows] = await pool.query(
    "INSERT INTO car (amount_car, id_users,  id_product) VALUES(?,?,?)",
    [amount_car, id_users, id_product]
  );
  const result = {
    id: rows.insertId,
    amount_car,
    id_users,
    id_product,
  };
  return result;
};

//Servicio que busca si ya existe un carrito por su id
export const SearchCarId = async (id_car) => {
  const [rows] = await pool.query("SELECT * FROM car WHERE id_car = ?", [
    id_car,
  ]);
  return rows.length;
};

//Servico para eliminar un producto de un carrito
export const Delete_Prod_Car = async (id_car) => {
  const [rows] = await pool.query("DELETE FROM car WHERE id_car = ?", [id_car]);
  return rows;
};
