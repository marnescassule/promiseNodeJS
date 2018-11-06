//Importamos o Modulo FileSystem

const {readFile, writeFile} = require('fs');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

class Database{
    
    constructor(){
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDados(){
        const dados = await readFileAsync(this.NOME_ARQUIVO);
        //fazemos o parse para transformar o texto 
        //em objeto JavaScript
        const dadosFormatados = JSON.parse(dados.toString());

        return dadosFormatados;
    }

    async escreverDados(dados){
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
    }

    async cadastrar(dado){
        const items = await this.obterDados();
        items.push(dado);
        return this.escreverDados(items);
    }

    listar(){
        return this.obterDados();
    }
}

async function main(){
    const database = new Database();
    const heroi = {
        nome: 'Batman',
        poder: 'Dinheiro'
    }
    await database.cadastrar(heroi);
    const dados = await database.listar();
    console.log("Herois: ", dados);
}

main();