import prismaClient from "../../prisma";
import { cloudinary } from "../../config/cloudinary";

interface CarIdRequest{
    car_id: string;
}

class DeleteCarService{
    async execute({car_id}: CarIdRequest){
         // 1. Busca o carro com imagens
        const car = await prismaClient.car.findUnique({
            where: {
                car_id,
            },
            include: {
                images: true,
            },
            });

        if (!car) {
            throw new Error("Car not found");
        }

        // 2. Deleta as imagens no Cloudinary
        for (const image of car.images) {
            if (image.public_id) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        // 3. Deleta o carro (e as imagens associadas no banco, via relacionamento)
        await prismaClient.carImage.deleteMany({
            where: {
                carId: car_id,
            },
        });

        const deletedCar = await prismaClient.car.delete({
            where: {
                car_id,
            },
        });

        return deletedCar;

    }

}

export {DeleteCarService};