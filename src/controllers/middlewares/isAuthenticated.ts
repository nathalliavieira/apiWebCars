//Aqui iremos criar o nosso middleware. Iremos usa-lo para controlar todas as paginas nas quais queremos que sejam mostradas apenas para quem estiver logado

import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
interface Payload{
    sub: string;
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction){
    //primeiramente iremos receber o nosso token:
    const authToken = req.headers.authorization; //Isso aqui é padrao, o token SEMPRE estará nesse caminho

    //Agora iremos verificar se realmente recebemos o token:
    if(!authToken){
        return res.status(401).end(); //Aqui estamos barrando o usuário logo de cara caso nao tenha token
    }
    //console.log(authToken);

    //Coletamos o token:
    const [, token] = authToken.split(" ") //Como vimos através do console.log, sempre recebemos uma palavra ("Bearer", que é como chamamos o prefix) e depois " " (espaço) e entao o token. Nesse codigo estamos dizendo que estamos separando o authtoken a cada " " (espaço) e [, token] aqui estamos dizendo que estamos ignorando o primeiro objeto, pegando o segundo e chamado de token.

    //validando o token:
    try{
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload; //criamos uma tipagem do tipo sub

        req.user_id = sub; //aqui criei uma variavel no req e atrelei ela ao id do usuario, no caso o sub, para isso precisamos criar uma tipagem para sobreescrever o nosso request. PARA ISSO CRIAREMOS ALGUMAS PASTAS, SEGUE O CAMINHO: src -> @types -> express -> (arquivo)index.d.ts

        return next();
    }catch(err){
        return res.status(401).end();
    }
}