import { Request, Response } from "express";
import { DetailsUserService } from "../../services/user/DetailsUserService";

class DetailsUserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id; //Por termos coletado a informacao do id do usuario através do nosso middleware, agora podemos utilizar-lo aqui.

        const detailsUserService = new DetailsUserService();
        
        const user = await detailsUserService.execute(user_id);

        return res.json(user);
    }
}

export {DetailsUserController};