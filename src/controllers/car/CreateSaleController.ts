import { Request, Response } from "express";
import { CreateSaleServices } from "../../services/car/CreateSaleServices";

class CreateSaleController{
    async handle(req: Request, res: Response){
        const {car_name, model, year, km, phone, city, price, description} = req.body;

        const user_id = req.user_id;

        const priceInt = parseInt(price, 10);

        if(!req.files || (req.files as Express.Multer.File[]).length === 0){
            throw new Error("Error upload file");
        }else{
            // req.files é um array de arquivos, mapeamos para extrair os nomes gerados
            const images = (req.files as Express.Multer.File[]).map(file => file.filename);

            const createSaleServices = new CreateSaleServices();

            const car = await createSaleServices.execute({
                images,
                car_name,
                model,
                year,
                km,
                phone,
                city,
                price: priceInt,
                description,
                user_id
            });
            
            return res.json(car);
        }

        
    }
}

export {CreateSaleController};