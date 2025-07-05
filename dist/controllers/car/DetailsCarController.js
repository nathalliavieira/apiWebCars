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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailsCarController = void 0;
const DetailsCarService_1 = require("../../services/car/DetailsCarService");
class DetailsCarController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const car_id = req.params.car_id;
            const detailCarService = new DetailsCarService_1.DetailsCarService();
            const car = yield detailCarService.execute({
                car_id
            });
            return res.json(car);
        });
    }
}
exports.DetailsCarController = DetailsCarController;
