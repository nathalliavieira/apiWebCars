"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSaleServices = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateSaleServices {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ images, car_name, model, year, km, phone, city, price, description, user_id }) {
            //todas as informacoes sao obrigatorias, entao verificaremos:
            if (!car_name || !model || !year || !km || !phone || !city || price === undefined || price === null || !description) {
                throw new Error("Please, provide all information!");
            }
            if (phone.length > 11) {
                throw new Error("Please, provide a correct number!");
            }
            //Cadastramos as infos:
            const car = yield prisma_1.default.car.create({
                data: {
                    images: {
                        create: images.map((image) => ({
                            url: image.url,
                            public_id: image.public_id,
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
                include: {
                    images: true,
                }
            });
            return car;
        });
    }
}
exports.CreateSaleServices = CreateSaleServices;
