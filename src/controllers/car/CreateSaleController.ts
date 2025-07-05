import { Request, Response } from "express";
import { CreateSaleServices } from "../../services/car/CreateSaleServices";

import { cloudinary } from "../../config/cloudinary";
import fs from "fs";
import { UploadedFile } from 'express-fileupload';

class CreateSaleController{
    async handle(req: Request, res: Response){
        const {car_name, model, year, km, phone, city, price, description} = req.body;

        const user_id = req.user_id;

        const priceInt = parseInt(price, 10);

        if(!req.files || Object.keys(req.files).length === 0){
            throw new Error("Error upload file");
        }else{
            const files = req.files as unknown as { [key: string]: UploadedFile | UploadedFile[] };

            const uploaded = files["file"] || files["images"];
            
            if (!uploaded) {
                throw new Error("No file uploaded");
            }

            const uploadedFiles = Array.isArray(uploaded) ? uploaded : [uploaded];

            //Limita o número de arquivos
                if (uploadedFiles.length > 10) {
                    throw new Error("You can upload a maximum of 10 images.");
                }

            const images: { url: string; public_id: string }[] = [];

            for (const file of uploadedFiles) {
                const result = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "car_images"
                });

                // Remove o arquivo temporário
                fs.unlinkSync(file.tempFilePath);

                images.push({
                    url: result.secure_url,
                    public_id: result.public_id
                }); // Você pode também pegar `result.public_id`
            }


            const createSaleServices = new CreateSaleServices();

            const car = await createSaleServices.execute({
                images, //Agora é um array de URLs
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