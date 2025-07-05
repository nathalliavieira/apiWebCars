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
exports.ListAllCarsService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class ListAllCarsService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = yield prisma_1.default.car.findMany({
                orderBy: {
                    created_at: 'desc' // <- mais recente primeiro
                },
                select: {
                    car_id: true,
                    car_name: true,
                    images: true,
                    year: true,
                    km: true,
                    city: true,
                    price: true,
                    user_id: true,
                }
            });
            return cars;
        });
    }
}
exports.ListAllCarsService = ListAllCarsService;
