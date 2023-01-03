import { Router } from "express";
import adminsController from "../controllers/admins.controller.js";
import validate from "../middlewares/validate.js";

const router = Router();

router.post('/admin/login', validate, adminsController.POST)

export default router;