"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailsUserController_1 = require("./controllers/user/DetailsUserController");
const isAuthenticated_1 = require("./controllers/middlewares/isAuthenticated");
const CreateSaleController_1 = require("./controllers/car/CreateSaleController");
const ListAllCarsUserController_1 = require("./controllers/car/ListAllCarsUserController");
const ListAllCarsController_1 = require("./controllers/car/ListAllCarsController");
const DeleteCarController_1 = require("./controllers/car/DeleteCarController");
const DetailsCarController_1 = require("./controllers/car/DetailsCarController");
const SearchCarController_1 = require("./controllers/car/SearchCarController");
//criamos nosso router
const router = (0, express_1.Router)();
exports.router = router;
//criamos o nosso multer. Agora ele poderá ser usado como um middleware 
// const upload = multer(uploadConfig.upload("./tmp"));
//-------ROTA USUARIO--------
//Rota de criar o usuário
router.post("/users", new CreateUserController_1.CreateUserController().handle); //do tipo post porque precisamos fornecer informacoes
//Rota de fazer o login do usuário
router.post("/session", new AuthUserController_1.AuthUserController().handle);
//Rota de detalhes do usuário
router.get("/me", isAuthenticated_1.isAuthenticated, new DetailsUserController_1.DetailsUserController().handle); //lembrando que isAuthenticated é o middleware de autenticacao
//-------ROTA FORM CARS--------
//Rota de fornecer as informacoes do carro
// router.post("/car", isAuthenticated, upload.array("images",10), new CreateSaleController().handle);
router.post("/car", isAuthenticated_1.isAuthenticated, new CreateSaleController_1.CreateSaleController().handle);
//Rota de listar todos os carros por usuário (no dashboard)
router.get("/cars/detail", isAuthenticated_1.isAuthenticated, new ListAllCarsUserController_1.ListAllCarsUserController().handle);
//Rota para listar o carro de todos os usuarios, na pagina home
router.get("/", new ListAllCarsController_1.ListAllCarsController().handle);
//Rota para deletar um carro
router.delete("/car", isAuthenticated_1.isAuthenticated, new DeleteCarController_1.DeleteCarController().handle);
//Rota de detalhes de um carro
router.get("/car/:car_id", new DetailsCarController_1.DetailsCarController().handle);
//Rota para procurar um carro pelo nome
router.get("/carname", new SearchCarController_1.SearchCarController().handle);
