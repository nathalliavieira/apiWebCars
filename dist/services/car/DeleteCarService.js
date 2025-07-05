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
exports.DeleteCarService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const cloudinary_1 = require("../../config/cloudinary");
class DeleteCarService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ car_id }) {
            // 1. Busca o carro com imagens
            const car = yield prisma_1.default.car.findUnique({
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
                    yield cloudinary_1.cloudinary.uploader.destroy(image.public_id);
                }
            }
            // 3. Deleta o carro (e as imagens associadas no banco, via relacionamento)
            yield prisma_1.default.carImage.deleteMany({
                where: {
                    carId: car_id,
                },
            });
            const deletedCar = yield prisma_1.default.car.delete({
                where: {
                    car_id,
                },
            });
            return deletedCar;
        });
    }
}
exports.DeleteCarService = DeleteCarService;
