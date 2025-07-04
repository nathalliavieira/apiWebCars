import crypto from "crypto"; //serve para gerarmos o nome das imagens, evitando que possuem nomes duplicados //esse é um pacote que ja esta instalado junto com o nodejs
import multer from "multer";

import {extname, resolve} from "path" //esse é um pacote que ja esta instalado junto com o nodejs

export default{
    upload(folder: string){ //poderia ser outro nome, mas por conveniencia chamamos de upload. Quando chamamos esse método, precisamos fornecer o nome da pasta aonde queremos que a imagem seja salva (folder)
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, ".." , ".." , folder), //__dirname é o diretorio no qual estamos, no caso desse arquivo aqui é o config
                //".." é para voltar uma pasta
                filename: (request, file, callback) => { //Usamos o filename para nao ter conflito de nome nas fotos. Ele sempre irá receber três parametros (request, file, callback)
                    const fileHash = crypto.randomBytes(16).toString("hex"); //nome criptografado
                    
                    const fileName = `${fileHash}-${file.originalname}` //O nome da foto no final das contas será o hash gerado + o nome original da foto

                    return callback(null, fileName); //o primeiro parametro passado foi o null porque no caso o primeiro parametro do callback é um erro, e como nao queriamos tratar retornamos null. O segundo é o nome da foto

                }
            })
        }

    }
}