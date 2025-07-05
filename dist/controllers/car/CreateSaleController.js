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
exports.CreateSaleController = void 0;
const CreateSaleServices_1 = require("../../services/car/CreateSaleServices");
const cloudinary_1 = require("../../config/cloudinary");
const fs_1 = __importDefault(require("fs"));
class CreateSaleController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { car_name, model, year, km, phone, city, price, description } = req.body;
            const user_id = req.user_id;
            const priceInt = parseInt(price, 10);
            if (!req.files || Object.keys(req.files).length === 0) {
                throw new Error("Error upload file");
            }
            else {
                const files = req.files;
                const uploaded = files["file"] || files["images"];
                if (!uploaded) {
                    throw new Error("No file uploaded");
                }
                const uploadedFiles = Array.isArray(uploaded) ? uploaded : [uploaded];
                //Limita o número de arquivos
                if (uploadedFiles.length > 10) {
                    throw new Error("You can upload a maximum of 10 images.");
                }
                const images = [];
                for (const file of uploadedFiles) {
                    const result = yield cloudinary_1.cloudinary.uploader.upload(file.tempFilePath, {
                        folder: "car_images"
                    });
                    // Remove o arquivo temporário
                    fs_1.default.unlinkSync(file.tempFilePath);
                    images.push({
                        url: result.secure_url,
                        public_id: result.public_id
                    }); // Você pode também pegar `result.public_id`
                }
                const createSaleServices = new CreateSaleServices_1.CreateSaleServices();
                const car = yield createSaleServices.execute({
                    images, //Agora é um array de URLs
                    car_name,
                    model,
                    year,
                    km,
                    phone,
                    city,
                    price: priceInt,
                    description,
                    user_id
                });
                return res.json(car);
            }
        });
    }
}
exports.CreateSaleController = CreateSaleController;
