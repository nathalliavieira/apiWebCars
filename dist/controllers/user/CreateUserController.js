"use strict";
//O controller será responsável por conversar com o banco de dados. Entao quando quisermos fazer algo que envolva o banco, por exemplo, um cadastro, nós iremos chamar o controller
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
exports.CreateUserController = void 0;
const CreateUserService_1 = require("../../services/user/CreateUserService");
class CreateUserController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body; //O controller pega os dados do body. Aqui os dados estao de uma maneira desconstruida. Se colocassemos apenas req.body iriamos receber um objeto
            const createUserService = new CreateUserService_1.CreateUserService(); //Aqui estamos inicializando o servico
            const user = yield createUserService.execute({
                name,
                email,
                password
            }); //Aqui estamos executando
            return res.json(user); //Aqui estamos retornando a resposta.
        });
    }
}
exports.CreateUserController = CreateUserController;
