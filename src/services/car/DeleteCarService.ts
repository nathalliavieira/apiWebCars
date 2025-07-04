import prismaClient from "../../prisma";

interface CarIdRequest{
    car_id: string;
}

class DeleteCarService{
    async execute({car_id}: CarIdRequest){
        
        const car = await prismaClient.car.delete({
            where:{
                car_id: car_id
            }
        })

        return car;

    }

}

export {DeleteCarService};