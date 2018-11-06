/*
1º Obter endereço pelo usuário
2º Obter telefone pelo usuário

printar na tela o Nome, TELEFONE, ENDEREÇO
*/

//Vimos que trabalhar com CallBacks pode ser um tanto 
//complicado: desorganização de código, tratamento
// nome de variável


//PROMISES

//1º Estado: new Promise () => Pending (não terminou)
//2º Estado: .then() => quando deu bom
//3º Estado: .catch() => quando deu ruim

//dentro destas funções todas as manipulações
//retorna uma nova Promise

// testePromise()
//     .then(function(resultado){
//         console.log('meu resultado ', resultado);
//         return resultado = " Patata"
//     })
//     .then(function(resultado){
//         console.log("valor anterior", resultado);
//     })
//     .catch(function(error){
//         console.error("DEU RUIM", error)
//     })

//Para converter callbacks para promises, usamos o modulo interno do node.js
//se a função seguir a convenção -> 1 parametro = erro e 2 parametro = sucesso

//os mano do C#, criaram a feature
//para realizar promise na mesma linha
//a mesma ordem de código que é escrio é executada
//1º inserir a palavra async na função
//2º inserir a palavra await na promise

const {promisify} = require('util');


//convertemos nossa função para promise

const obterTelefoneAsync = promisify(telefone);
// function testePromise(){
   
//         const promise = new Promise(function(resolve, reject){
//             setTimeout(()=>{
//                 const meuObj = {nome: 'Patati'}
//                 return resolve(meuObj)
//             }, 2000);
//         })
//     return promise;
// }
function obterUsuario()
{
    return new Promise(function(resolve, reject){
        setTimeout(()=>{
            //chamamos a função que foi passada
            //quando for resolvido
            return resolve({
                id: 1, 
                nome: "Xuxa da Silva"
            })
        }, 2000);
    })
    
}

//por convenção o callback é sempre o 
//último argumento
function endereco(idUsuario){
    return new Promise(function(resolve, reject){
        setTimeout(()=>{
            return resolve({
                rua: 'dos bobos',
                numero: 0
            });
        }, 1000);
    })
    
}

function telefone(idUsuario, callback){
    setTimeout(()=>{
        return callback(null, {
            ddd:11,
            telefone: '123123',
        });
    }, 2000)
}

// function resolverUsuario(erro, sucesso)
// {
//     console.log(sucesso);
// }

//função Main
// function main(){
//     //sincronizamos a chamada de usuário, enviando
//     //uma funcção que será executada, quando o usuário 
//     // for resolvido
//     obterUsuario(function resolverUsuario(erro, sucesso){
//         const usuario = sucesso.id;

//         //NULL, UNDEFINED, 0 === FALSE
//         if(erro){
//             console.error("DEU RUIM USUÁRIO");
//             return;
//         }
//         endereco(usuario, function resolverEndereco(erro1, sucesso1){
//             if(erro1){
//                 console.error("DEU RUIM ENDEREÇO", erro1);
//                 return;
//             }
//             console.log(`Nome: ${sucesso.nome}
//                          Endereço : ${sucesso1.rua}, ${sucesso1.numero}`);
//             telefone(usuario,
//                     function resolverTelefone(erro2, sucesso2){
//                         console.log(`Nome: ${sucesso.nome}
//                                     Endereço : ${sucesso1.rua}, ${sucesso1.numero}
//                                     Telefone: ${sucesso2.ddd} ${sucesso2.telefone}`);
//                     })
//         });
//     });
   
    
// }

// function main(){
//     obterUsuario()
//     .then(function resolverUsuario(usuario){
//         const resultado = endereco(usuario.id)
//         const promiseEndereco = resultado.then(function(meuEndereco){
//             return {
//                 usuario: usuario,
//                 endereco: meuEndereco
//             }
//         })
//         return promiseEndereco
//     })
//     .then(function(resultado){
//         return obterTelefoneAsync(resultado.usuario.id)
//         .then(function(meuTelefone){
//             return{
//                 telefone: meuTelefone,
//                 // usuario: resultado.usuario,
//                 // endereco: resultado.endereco
//                 ...resultado

//             }
//         })
//     })
//     .then(function(resultado){
//         console.log('final', resultado);
//     })
//     .catch(function(error){
//         console.log("DEU RUIM", error)
//     })
// }

async function main(){
    try{
        console.time("promise");
        const usuario = await obterUsuario()
        // const enderecoResultado = await endereco(usuario.id)
        // const telefone = await obterTelefoneAsync(usuario.id)

        //para executar as funções em paralelo
        //executamos as funções que não são dependentes
        //uma da outra ao mesmo tempo
        //extraimos somente e a segunda posição
        //deste array

        const [enderecoResultado, telefone] = await Promise.all(
        [
            endereco(usuario.id),
            obterTelefoneAsync(usuario.id)
        ]
        )
        console.log(`Nome: ${usuario.nome}
                     Endereco: ${enderecoResultado.rua},
                     Telefone: (${telefone.ddd} ${telefone.telefone}`);
        console.timeEnd("promise");
    }
    catch(err)
    {
        console.log("DEU RUIM, MAS MAIS BONITO", err);
    }

    
}


main();