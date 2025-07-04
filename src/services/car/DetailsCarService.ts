import prismaClient from "../../prisma";

interface DetailProps{
    car_id: string;
}

class DetailsCarService{
    async execute({car_id}: DetailProps){

        const car = await prismaClient.car.findFirst({
            where:{
                car_id: car_id
            },
            include:{ //Precisamos incluir as imagens porque como está sendo relacionado nessa tabela essa é a forma de puxar a informacao
                images: true
            }
        })

        return car;

    }
}

export {DetailsCarService};