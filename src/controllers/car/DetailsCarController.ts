import { Request, Response } from "express";
import { DetailsCarService } from "../../services/car/DetailsCarService";

class DetailsCarController{
    async handle(req: Request, res: Response){
        const car_id = req.params.car_id as string;

        const detailCarService = new DetailsCarService();

        const car = await detailCarService.execute({
            car_id
        });

        return res.json(car);
    }
}

export {DetailsCarController};