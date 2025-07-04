import prismaClient from "../../prisma";

interface SaleRequest{
    images: string[];
    car_name: string;
    model: string;
    year: string;
    km: string;
    phone: string;
    city: string;
    price: number;
    description: string;
    user_id: string;
}

class CreateSaleServices{
    async execute({images, car_name, model, year, km, phone, city, price, description, user_id}: SaleRequest){
        //todas as informacoes sao obrigatorias, entao verificaremos:
        if(!car_name || !model || !year || !km || !phone || !city || !price || !description){
            throw new Error("Please, provide all information!");
        }

        if(phone.length > 11){
            throw new Error("Please, provide a correct number!");
        }

        //Cadastramos as infos:
        const car = await prismaClient.car.create({
            data:{
                images: {
                    create: images.map((url) => ({
                        url,
                    })),
                },
                car_name: car_name,
                model: model,
                year: year,
                km: km,
                phone: phone,
                city: city,
                price: price,
                description: description,
                user_id: user_id,
            },
            include:{
                images: true,
            }
        })

        return car;
    }
}

export {CreateSaleServices};