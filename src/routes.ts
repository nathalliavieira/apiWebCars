import { Router, Request, Response } from "express";
import multer from "multer";

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailsUserController } from "./controllers/user/DetailsUserController";

import { isAuthenticated } from "./controllers/middlewares/isAuthenticated";

import { CreateSaleController } from "./controllers/car/CreateSaleController";
import { ListAllCarsUserController } from "./controllers/car/ListAllCarsUserController";

//importando o nosso multer (caminho da nossa imagem)
import uploadConfig from "./config/multer";
import { ListAllCarsController } from "./controllers/car/ListAllCarsController";
import { DeleteCarController } from "./controllers/car/DeleteCarController";
import { DetailsCarController } from "./controllers/car/DetailsCarController";
import { SearchCarController } from "./controllers/car/SearchCarController";

//criamos nosso router
const router = Router();

//criamos o nosso multer. Agora ele poderá ser usado como um middleware 
const upload = multer(uploadConfig.upload("./tmp"));

//-------ROTA USUARIO--------

//Rota de criar o usuário
router.post("/users", new CreateUserController().handle); //do tipo post porque precisamos fornecer informacoes

//Rota de fazer o login do usuário
router.post("/session", new AuthUserController().handle);

//Rota de detalhes do usuário
router.get("/me", isAuthenticated, new DetailsUserController().handle);//lembrando que isAuthenticated é o middleware de autenticacao

//-------ROTA FORM CARS--------

//Rota de fornecer as informacoes do carro
router.post("/car", isAuthenticated, upload.array("images",10), new CreateSaleController().handle);

//Rota de listar todos os carros por usuário (no dashboard)
router.get("/cars/detail", isAuthenticated, new ListAllCarsUserController().handle);

//Rota para listar o carro de todos os usuarios, na pagina home
router.get("/", new ListAllCarsController().handle);

//Rota para deletar um carro
router.delete("/car", isAuthenticated, new DeleteCarController().handle);

//Rota de detalhes de um carro
router.get("/car/:car_id", new DetailsCarController().handle);

//Rota para procurar um carro pelo nome
router.get("/carname", new SearchCarController().handle);

export { router };