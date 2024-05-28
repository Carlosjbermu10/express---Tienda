import { pool } from "../../database/db.js";

export const getSerRegister = async () => {};

//Servicio que busca si ya existe un Producto
export const SearchProductId = async (id_prod) => {
  const [rows] = await pool.query(
    "SELECT * FROM product WHERE id_product = ?",
    [id_prod]
  );
  return rows.length;
};

//Servicio que busca la imagen de un Producto por su id
export const SearchImagProductId = async (id_product) => {
  const [rows] = await pool.query(
    "SELECT * FROM imag_product WHERE id_product = ?",
    [id_product]
  );
  return rows.length;
};

//Servicio que retorna el id_public de una imagen de un Producto
export const ReturnImagProductId_public = async (id_imag_prod) => {
  const [rows] = await pool.query(
    "SELECT * FROM imag_product WHERE id_imag_product   = ?",
    [id_imag_prod]
  );
  return rows[0].id_public;
};

//Servicio para registrar una imagen en un Producto
export const RegisterImagProduct = async (imag_prod) => {
  const url_imag = imag_prod.url_imag;
  const id_public = imag_prod.id_public;
  const id_product = imag_prod.id_product;

  const [rows] = await pool.query(
    "INSERT INTO imag_product (id_product, url_imag, id_public) VALUES(?,?,?)",
    [id_product, url_imag, id_public]
  );
  const result = {
    id: rows.insertId,
    url_imag,
    id_public,
    id_product,
  };
  return result;
};

//Servicio para eliminar una imagen de un Producto
export const DeleteImagProductId = async (id_imag_prod) => {
  const [rows] = await pool.query(
    "DELETE FROM imag_product WHERE id_imag_product = ?",
    [id_imag_prod]
  );
  return rows;
};
