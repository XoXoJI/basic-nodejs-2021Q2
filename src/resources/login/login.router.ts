import { Router } from "express";
import { LoginController } from "./login.controller";

const router = Router();

const loginController = new LoginController();

router.post('/', async (req, res) => {
    await loginController.getToken(req.body, res);
});

export default router;
