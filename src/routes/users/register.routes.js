import { Router } from "express";
import {
  getRegister,
  postRegister,
} from "../../controllers/users/register.controller.js";

const router = Router();

router.get("/register", getRegister);
router.post("/register", postRegister);

export default router;
