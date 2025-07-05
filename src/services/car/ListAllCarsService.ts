import prismaClient from "../../prisma";

class ListAllCarsService{
    async execute(){
        const cars = await prismaClient.car.findMany({
            orderBy: {
                created_at: 'desc' // <- mais recente primeiro
            },
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