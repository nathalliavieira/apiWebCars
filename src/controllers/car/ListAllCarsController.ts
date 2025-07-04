import { Request, Response } from "express";
import { ListAllCarsService } from "../../services/car/ListAllCarsService";

class ListAllCarsController{
    async handle(req: Request, res: Response){
        const listAllCarsService = new ListAllCarsService();

        const cars = await listAllCarsService.execute();

        return res.json(cars);
    }
}

export {ListAllCarsController};