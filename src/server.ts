import express, {Request, Response, NextFunction} from "express";
import "express-async-errors"; //Sempre deve ser importada como segundo import
import cors from "cors";
import path from "path"; //1
import { router } from "./routes";

//Primeiro inicializamos o projeto:
const app = express();
app.use(express.json()); //Dizemos pro nosso express que o tipo de dado que iremos usar é o json
app.use(cors());

app.use(router); //Aqui estamos dizendo que a rota da nossa navegação vem do nosso router

//Criamos uma rota estatica para expormos a nossa foto, ou seja, para que a gente possa acessar-la na internet atraves de um link: 2
app.use("/files", express.static(path.resolve(__dirname, ".." , "tmp")));

//Agora criamos uma barrareira atraves de um middleware:
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    //Verificamos se o que estamos recebendo é realmente do tipo erro:
    if(err instanceof Error){
        //Se sim:
        return res.status(400).json({
            error: err.message
        })
    }

    //Se nao for do tipo error: (Pode ser outro tipo de erro, um erro interno por exemplo)
    return res.status(500).json({
        status: "error",
        message: "Internal server error."
    })
})

app.listen(3333, () => console.log("Server online!")) //Aqui dizemos em qual porta queremos que nosso projeto rode (3333) e depois dizemos o callback (retorno)