import prismaClient from "../../prisma";

class ListAllCarsService{
    async execute(){
        const cars = await prismaClient.car.findMany({
            select:{
                car_id: true,
                car_name: true,
                images: true,
                year: true,
                km: true,
                city: true,
                price: true,
                user_id: true,
            }
        })

        return cars;
    }
}

export {ListAllCarsService};