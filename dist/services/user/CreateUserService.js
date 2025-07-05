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
exports.CreateUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
class CreateUserService {
    //Segundo, aqui iremos chamar uma funcao async e iremos passar dentro dela os dados que precisamos receber
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password }) {
            //Aqui dentro primeiramente preciso verificar se enviou um email
            if (!email) {
                throw new Error("Incorrect email");
            }
            //Segunda verificacao é verificar se o email ja esta cadastrado na plataforma
            const userAlreadyExists = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            }); //Aqui fiz o seguinte: Criei uma const aonde ela irá buscar através do método findFirst se o email no qual estou cadastrando já existe na plataforma. Se existir, irá armazenar o email nessa constante
            if (userAlreadyExists) {
                throw new Error("User already exists.");
            }
            //*Antes de cadastrar precisamos criptografar a senha que o usuario irá digitar, para isso iremos usar a biblioteca bcryptjs. Instalamos ela no cmd (yarn add bcryptjs) e também instalamos o typescript para ela (yarn add @types/bcryptjs -D), e o pacote será o hash:
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8); //O número 8 é o salto da criptografia
            //Terceiro: Cadastrar o usuario no banco
            const user = yield prisma_1.default.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            });
            return (user);
        });
    }
}
exports.CreateUserService = CreateUserService;
