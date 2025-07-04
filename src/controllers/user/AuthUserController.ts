import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController{
    async handle(req: Request, res: Response){
        //Solicitamos o email e password:
        const {email, password} = req.body;

        //Inicializa o servico:
        const authUserService = new AuthUserService();

        //passa para o servico o que coletamos:
        const auth = await authUserService.execute({
            email,
            password
        });

        //retorna na tela o que coletamos:
        return res.json(auth);
    }
}

export {AuthUserController};