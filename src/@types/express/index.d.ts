//Aqui vamos criar uma tipagem para sobreescrever o nosso request. Porque queremos fazer isso? porque queremos adicionar uma categoria nova ao nosso request e o typescript nao aceita, logo precisamos sobreescrever.

declare namespace Express{
    export interface Request{
        user_id: string; //Aqui estamos adicionando a mais o user_id
    }
}

//PARA ISSO, PRECISAMOS INFORMAR AO NOSSO TYPESCRIPT (NO ARQUIVO TSCONFIG.JSON, EM "MODULE": "COMMONJS", ATIVAMOS A FUNCIONALIDADE "TYPEROOTS": [] QUE ATÉ ENTAO ESTAVA COMENTADA) E INFORMAMOS O CAMINHO DA NOSSA TIPAGEM, DENTRO DE ["./SRC/@TYPES"]