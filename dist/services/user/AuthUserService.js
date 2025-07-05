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
exports.AuthUserService = void 0;
const bcryptjs_1 = require("bcryptjs");
const prisma_1 = __importDefault(require("../../prisma"));
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password }) {
            //1. Verificar se o email existe:
            const user = yield prisma_1.default.user.findFirst({
                where: {
                    email: email
                }
            });
            if (!user) {
                throw new Error("Incorrect User/Password");
            }
            //Preciso verificar se a senha está correta através do pacote compare da biblioteca bcryptjs
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, user.password); //Aqui estamos comparando se a senha criptografa é a mesma que o usuário digitou. Se sim irá devolver para a const true or false
            if (!passwordMatch) {
                throw new Error("Incorrect User/Password");
            }
            //Logar o usuário de fato, para isso precisamos gerar um token JWT e devolver os dados do usuario, como id, name, email. Para gerar o token precisamos instalar a biblioteca jsonwebtoken (yarn add jsonwebtoken) e também precisamos instalar a tipagem dele (yarn add @types/jsonwebtoken -D)
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email,
            }, //Segunda coisa a nossa secret key, para isso precisamos de uma variavel ambiente porque secrets keys nunca podem ser expostas
            //Secret JWT https://www.md5hashgenerator.com/ utilizaremos esse site para gerar uma senha aleatoria. Nele podemos escrever o que quisermos, no caso agora iremos escrever o nome do nosso projeto "projetoWebCarros".
            //Para acessarmos uma variavel ambiente podemos instalar a biblioteca dotenv (yarn add dotenv)
            process.env.JWT_SECRET, //provavelmente aqui o typescript irá acusar erro pedindo para tiparmos a nossa variavel ambiente, porém isso será desabilitado no nosso tsconfig.json buscamos "strict" e mudamos fala false ("strict": false,)
            {
                subject: user.id,
                expiresIn: "30d" //Quando o token irá experirar
            });
            //Agora retorno na tela as informacoes que eu quero:
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token: token
            };
        });
    }
}
exports.AuthUserService = AuthUserService;
