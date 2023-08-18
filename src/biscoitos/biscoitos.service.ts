import { Injectable } from '@nestjs/common';
import { BiscoitosDaSorte } from './models/biscoitoDaSorte.model';
import { BiscoitosDoAzar } from './models/biscoitoDoAzar.model';
import { HttpException } from '@nestjs/common';



const pesquisarFrase = (arrayDeStrings: string[], stringBuscada: string): object => {
    const resultados = arrayDeStrings.filter(elemento => elemento.includes(stringBuscada));

    if (resultados.length > 0) {
        return {resultados_encontrados: resultados};
    } else {
        return {resultados_encontrados: `Nenhum resultado encontrado`};
    }
};


const fraseAleatoria = (array: Array<string>): string => {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

@Injectable()
export class BiscoitosService {

    async listarTodosOsBiscoitos(): Promise<object> {
        const biscoitosDaSorte = await BiscoitosDaSorte.findAll({attributes: ['biscoitoDaSorte']});
        const biscoitosDoAzar = await BiscoitosDoAzar.findAll({attributes: ['biscoitosDoAzar']});    
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
        await BiscoitosDaSorte.create({biscoitoDaSorte: frase})
        return `O biscoito com a frase: "${frase}" foi adicionado com sucesso!`
    }

    async criarBiscoitoDoAzar(frase : string) : Promise<string>{
        await BiscoitosDoAzar.create({biscoitosDoAzar: frase})
        return `O biscoito do azar com a frase: "${frase}" foi adicionado com sucesso!`
    }

    async pesquisarBiscoitoDaSorte(frase: string) : Promise<object> {
        let biscoitos = await BiscoitosDaSorte.findAll();
        let frasesDaSorte: string[] = biscoitos.map((biscoito) => biscoito.biscoitoDaSorte)
        return pesquisarFrase(frasesDaSorte, frase);
    }

    async pesquisarBiscoitoDoAzar(frase: string) : Promise<object> {
        let biscoitos = await BiscoitosDoAzar.findAll();
        let frasesDoAzar : string[] = biscoitos.map((biscoito) => biscoito.biscoitosDoAzar);
        return pesquisarFrase(frasesDoAzar, frase);
    }

    
}
