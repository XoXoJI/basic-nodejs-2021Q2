import { Response } from "express";
import { loginDTO } from "./login.dto";
import { LoginService } from "./login.service";
import { StatusCodes } from "http-status-codes";

export class LoginController {
    private loginService: LoginService;

    constructor() {
        this.loginService = new LoginService();
    }

    async getToken(data: loginDTO, res: Response) {
        if (!data.login || !data.password) {
            res.status(StatusCodes.FORBIDDEN).json(new Error('wrong login/pass'));
        }

        try {
            const token = await this.loginService.getToken(data);

            res.status(StatusCodes.OK).json({ token })
        } catch (err) {
            res.status(StatusCodes.FORBIDDEN).json(err);
        }
    }
}
