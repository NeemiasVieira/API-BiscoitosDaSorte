import { Injectable } from '@nestjs/common';
import { tratarErro } from 'src/erros';
import { BiscoitosDaSorte } from './models/biscoitoDaSorte.model';
import { BiscoitosDoAzar } from './models/biscoitoDoAzar.model';

//Função que recebe uma busca e um array, e faz a pesquisa dentro deste array
const pesquisarFrase = (arrayDeStrings: string[], stringBuscada: string): {resultados_encontrados : any} => {
    const resultados = arrayDeStrings.filter(elemento => elemento.includes(stringBuscada));

    if (resultados.length > 0) {
        return {resultados_encontrados: resultados};
    } else {
        throw new tratarErro(404, "Nenhum resultado encontrado =(");
    }
};

//Função que retorna o valor de um indice aleatório de um array
const fraseAleatoria = (array: Array<string>): string => {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

@Injectable()
export class BiscoitosService {

    //Métodos GET

    async listarTodosOsBiscoitos(): Promise<object> {
        //Puxa todos os bicoitos do banco de dados
        const biscoitosDaSorte = await BiscoitosDaSorte.findAll({attributes: ['biscoitoDaSorte']});
        const biscoitosDoAzar = await BiscoitosDoAzar.findAll({attributes: ['biscoitosDoAzar']});
        //Pega apenas os valores dos biscoitos sem as chaves    
        const frasesBiscoitosDaSorte = biscoitosDaSorte.map(biscoito => biscoito.biscoitoDaSorte);
        const frasesBiscoitosDoAzar = biscoitosDoAzar.map(biscoito => biscoito.biscoitosDoAzar);    
        return { biscoitosDaSorte: frasesBiscoitosDaSorte, biscoitosDoAzar: frasesBiscoitosDoAzar};
    }
    async pegarBiscoitosDaSorte() : Promise<string> {
        let biscoitosDaSorte = await BiscoitosDaSorte.findAll();
        let frasesBiscoitosDaSorte = biscoitosDaSorte.map((biscoito) => biscoito.biscoitoDaSorte);
        return fraseAleatoria(frasesBiscoitosDaSorte);
    }

    async pegarBiscoitosDoAzar() : Promise<string> {
        let biscoitosDoAzar = await BiscoitosDoAzar.findAll();
        let frasesBiscoitosDoAzar : string[] = biscoitosDoAzar.map((biscoito) => biscoito.biscoitosDoAzar);
        return fraseAleatoria(frasesBiscoitosDoAzar);
    }


    // Métodos POSTS

    async criarBiscoitoDaSorte(frase : string) : Promise<string>{
        //Verifica se o biscoito já existe no banco de dados
        const biscoitoJaExiste = await BiscoitosDaSorte.findOne({where: {biscoitoDaSorte: frase}});
        if (biscoitoJaExiste) throw new tratarErro(400, "O biscoito já existe");
        //Caso não exista um biscoito igual, o biscoito é criado
        await BiscoitosDaSorte.create({biscoitoDaSorte: frase});
        return `O biscoito com a frase: "${frase}" foi adicionado com sucesso!`;
    }

    async criarBiscoitoDoAzar(frase : string) : Promise<string>{
        //Verifica se o biscoito já existe no banco de dados
        const biscoitoJaExiste = await BiscoitosDoAzar.findOne({where: {biscoitosDoAzar: frase}});
        if (biscoitoJaExiste) throw new tratarErro(400, "O biscoito já existe");
        //Caso não exista um biscoito igual, o biscoito é criado
        await BiscoitosDoAzar.create({biscoitosDoAzar: frase});
        return `O biscoito do azar com a frase: "${frase}" foi adicionado com sucesso!`;
    }

    async pesquisarBiscoitoDaSorte(frase: string) : Promise<object> {
        let biscoitos = await BiscoitosDaSorte.findAll();
        let frasesDaSorte: string[] = biscoitos.map((biscoito) => biscoito.biscoitoDaSorte);
        const resultado = pesquisarFrase(frasesDaSorte, frase);   
        return resultado;
    }

    async pesquisarBiscoitoDoAzar(frase: string) : Promise<object> {
        let biscoitos = await BiscoitosDoAzar.findAll();
        let frasesDoAzar : string[] = biscoitos.map((biscoito) => biscoito.biscoitosDoAzar);
        const resultado = pesquisarFrase(frasesDoAzar, frase);
        return resultado;
    }

    
}
