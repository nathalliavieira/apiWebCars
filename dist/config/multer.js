"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto")); //serve para gerarmos o nome das imagens, evitando que possuem nomes duplicados //esse é um pacote que ja esta instalado junto com o nodejs
const multer_1 = __importDefault(require("multer"));
const path_1 = require("path"); //esse é um pacote que ja esta instalado junto com o nodejs
exports.default = {
    upload(folder) {
        return {
            storage: multer_1.default.diskStorage({
                destination: (0, path_1.resolve)(__dirname, "..", "..", folder), //__dirname é o diretorio no qual estamos, no caso desse arquivo aqui é o config
                //".." é para voltar uma pasta
                filename: (request, file, callback) => {
                    const fileHash = crypto_1.default.randomBytes(16).toString("hex"); //nome criptografado
                    const fileName = `${fileHash}-${file.originalname}`; //O nome da foto no final das contas será o hash gerado + o nome original da foto
                    return callback(null, fileName); //o primeiro parametro passado foi o null porque no caso o primeiro parametro do callback é um erro, e como nao queriamos tratar retornamos null. O segundo é o nome da foto
                }
            })
        };
    }
};
