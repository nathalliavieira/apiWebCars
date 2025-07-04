import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({email, password}: AuthRequest){
        //1. Verificar se o email existe:
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        });
        
        if(!user){
            throw new Error("Incorrect User/Password");
        }

        //Preciso verificar se a senha está correta através do pacote compare da biblioteca bcryptjs
        const passwordMatch = await compare(password, user.password); //Aqui estamos comparando se a senha criptografa é a mesma que o usuário digitou. Se sim irá devolver para a const true or false

        if(!passwordMatch){
            throw new Error("Incorrect User/Password");
        }

        //Logar o usuário de fato, para isso precisamos gerar um token JWT e devolver os dados do usuario, como id, name, email. Para gerar o token precisamos instalar a biblioteca jsonwebtoken (yarn add jsonwebtoken) e também precisamos instalar a tipagem dele (yarn add @types/jsonwebtoken -D)
        const token = sign(
            { //Primeira coisa a ser fornecida aqui é o payload, que é o que queremos ter e geralmente nao colocamos informacoes sensiveis, como senha
                name: user.name,
                email: user.email,
            },//Segunda coisa a nossa secret key, para isso precisamos de uma variavel ambiente porque secrets keys nunca podem ser expostas
            //Secret JWT https://www.md5hashgenerator.com/ utilizaremos esse site para gerar uma senha aleatoria. Nele podemos escrever o que quisermos, no caso agora iremos escrever o nome do nosso projeto "projetoWebCarros".
            //Para acessarmos uma variavel ambiente podemos instalar a biblioteca dotenv (yarn add dotenv)
            process.env.JWT_SECRET, //provavelmente aqui o typescript irá acusar erro pedindo para tiparmos a nossa variavel ambiente, porém isso será desabilitado no nosso tsconfig.json buscamos "strict" e mudamos fala false ("strict": false,)
            { //Terceira coisa é passarmos as options
                subject: user.id,
                expiresIn: "30d" //Quando o token irá experirar
            }
        )

        //Agora retorno na tela as informacoes que eu quero:
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
        };
    }
}

export {AuthUserService};