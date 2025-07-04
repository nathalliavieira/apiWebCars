import { Request, Response } from "express";
import { ListAllCarsUserService } from "../../services/car/ListAllCarsUserService";

class ListAllCarsUserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id as string;

        const listAllCarsUserService =  new ListAllCarsUserService();

        const sales = await listAllCarsUserService.execute({
            user_id
        });

        return res.json(sales);
    }
}

export {ListAllCarsUserController};