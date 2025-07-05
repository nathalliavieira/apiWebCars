"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
require("express-async-errors"); //Sempre deve ser importada como segundo import
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path")); //1
const routes_1 = require("./routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
//Primeiro inicializamos o projeto:
const app = (0, express_1.default)();
app.use(express_1.default.json()); //Dizemos pro nosso express que o tipo de dado que iremos usar é o json
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 }, //Arquivos no tamanho máximo de 50mb
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));
app.use(routes_1.router); //Aqui estamos dizendo que a rota da nossa navegação vem do nosso router
//Criamos uma rota estatica para expormos a nossa foto, ou seja, para que a gente possa acessar-la na internet atraves de um link: 2
app.use("/files", express_1.default.static(path_1.default.resolve(__dirname, "..", "tmp")));
//Agora criamos uma barrareira atraves de um middleware:
app.use((err, req, res, next) => {
    //Verificamos se o que estamos recebendo é realmente do tipo erro:
    if (err instanceof Error) {
        //Se sim:
        return res.status(400).json({
            error: err.message
        });
    }
    //Se nao for do tipo error: (Pode ser outro tipo de erro, um erro interno por exemplo)
    return res.status(500).json({
        status: "error",
        message: "Internal server error."
    });
});
app.listen(process.env.PORT, () => console.log("Server online!")); //Aqui dizemos em qual porta queremos que nosso projeto rode (3333) e depois dizemos o callback (retorno)
