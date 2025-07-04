//O controller será responsável por conversar com o banco de dados. Entao quando quisermos fazer algo que envolva o banco, por exemplo, um cadastro, nós iremos chamar o controller

import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController{
    async handle(req: Request, res: Response){
        const {name, email, password} = req.body; //O controller pega os dados do body. Aqui os dados estao de uma maneira desconstruida. Se colocassemos apenas req.body iriamos receber um objeto

        const createUserService = new CreateUserService(); //Aqui estamos inicializando o servico

        const user = await createUserService.execute({
            name, 
            email, 
            password
        }); //Aqui estamos executando

        return res.json(user); //Aqui estamos retornando a resposta.
    }
}

export {CreateUserController};