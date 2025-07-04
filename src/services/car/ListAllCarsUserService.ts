import prismaClient from "../../prisma";

interface DetailAllCarsRequest{
    user_id: string;
}

class ListAllCarsUserService{
    async execute({user_id}: DetailAllCarsRequest){

        const sales = await prismaClient.car.findMany({
            where:{
                user_id: user_id
            },
            include:{ //Precisamos incluir as imagens porque como está sendo relacionado nessa tabela essa é a forma de puxar a informacao
                images: true
            }
        })
        
        return sales;
    }
}

export {ListAllCarsUserService};