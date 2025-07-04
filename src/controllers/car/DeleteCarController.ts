import { Request, Response } from "express";
import { DeleteCarService } from "../../services/car/DeleteCarService";

class DeleteCarController{
    async handle(req: Request, res: Response){
        const car_id = req.query.car_id as string;

        const deleteCarService = new DeleteCarService();

        const carDelete = await deleteCarService.execute({
            car_id
        });

        
        return res.json(carDelete);
    }
}

export {DeleteCarController};