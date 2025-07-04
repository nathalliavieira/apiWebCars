import prismaClient from "../../prisma";

interface Props{
    car_name: string;
}

class SearchCarService{
    async execute({car_name}: Props){
        const cars = await prismaClient.car.findMany({
            where:{
                car_name: {
                    contains: car_name,
                    mode: 'insensitive' // opcional: ignora maiúsculas/minúsculas
                }
            },
            include:{ //Precisamos incluir as imagens porque como está sendo relacionado nessa tabela essa é a forma de puxar a informacao
                images: true
            }
        })
        
        return cars;
    }
}

export {SearchCarService};