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
exports.DetailsUserController = void 0;
const DetailsUserService_1 = require("../../services/user/DetailsUserService");
class DetailsUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user_id = req.user_id; //Por termos coletado a informacao do id do usuario através do nosso middleware, agora podemos utilizar-lo aqui.
            const detailsUserService = new DetailsUserService_1.DetailsUserService();
            const user = yield detailsUserService.execute(user_id);
            return res.json(user);
        });
    }
}
exports.DetailsUserController = DetailsUserController;
