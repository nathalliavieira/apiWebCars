import { SearchCarService } from "../../services/car/SearchCarService";
import { Request, Response } from "express";

class SearchCarController{
    async handle(req: Request, res: Response){

        const car_name = req.query.car_name as string;

        const searchCarService = new SearchCarService();

        const cars = await searchCarService.execute({
            car_name
        })

        return res.json(cars);
    }
}

export {SearchCarController};