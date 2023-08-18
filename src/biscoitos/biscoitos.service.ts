import { Injectable } from '@nestjs/common';
import { BiscoitosDaSorte } from './models/biscoitoDaSorte.model';
import { BiscoitosDoAzar } from './models/biscoitoDoAzar.model';


const buscarFrase = (arrayDeStrings: string[], stringBuscada: string): string => {
    const resultados = arrayDeStrings.filter(elemento => elemento.includes(stringBuscada));

    if (resultados.length > 0) {
        return `Resultados encontrados: ${resultados.join(', ')}`;
    } else {
        return 'Nenhum resultado encontrado';
    }
};


const fraseAleatoria = (array: Array<string>): string => {
    const indiceAleatorio = Math.floor(Math.random() * array.length);
    return array[indiceAleatorio];
}

@Injectable()
export class BiscoitosService {

    async getTodososBiscoitos(): Promise<object> {
        let biscoitosDaSorte = await BiscoitosDaSorte.findAll();
        let biscoitosDoAzar = await BiscoitosDoAzar.findAll();    
        const frasesBiscoitosDaSorte = biscoitosDaSorte.map(biscoito => biscoito.biscoitoDaSorte);
        const frasesBiscoitosDoAzar = biscoitosDoAzar.map(biscoito => biscoito.biscoitosDoAzar);    
        return { biscoitosDaSorte: frasesBiscoitosDaSorte, biscoitosDoAzar: frasesBiscoitosDoAzar };
    }
    async getBiscoitoDaSorte() : Promise<string> {
        let biscoitosDaSorte = await BiscoitosDaSorte.findAll();
        let frasesBiscoitosDaSorte = biscoitosDaSorte.map((biscoito) => biscoito.biscoitoDaSorte)
        return fraseAleatoria(frasesBiscoitosDaSorte);
    }

    async getBiscoitoDoAzar() : Promise<string> {
        let biscoitosDoAzar = await BiscoitosDoAzar.findAll();
        let frasesBiscoitosDoAzar : string[] = biscoitosDoAzar.map((biscoito) => biscoito.biscoitosDoAzar);
        return fraseAleatoria(frasesBiscoitosDoAzar);
    }


    // Métodos POSTS

    async criarFraseDaSorte(frase : string) : Promise<string>{
        await BiscoitosDaSorte.create({biscoitoDaSorte: frase})
        return `A frase: "${frase}" foi adicionada com sucesso!`
    }

    async criarFraseDoAzar(frase : string) : Promise<string>{
        await BiscoitosDoAzar.create({biscoitosDoAzar: frase})
        return `A frase: "${frase}" foi adicionada com sucesso!`
    }

    async buscarBiscoitoDaSorte(frase: string) : Promise<string> {
        let biscoitos = await BiscoitosDaSorte.findAll();
        let frasesDaSorte: string[] = biscoitos.map((biscoito) => biscoito.biscoitoDaSorte)
        return buscarFrase(frasesDaSorte, frase);
    }

    async buscarBiscoitoDoAzar(frase: string) : Promise<string> {
        let biscoitos = await BiscoitosDoAzar.findAll();
        let frasesDoAzar : string[] = biscoitos.map((biscoito) => biscoito.biscoitosDoAzar);
        return buscarFrase(frasesDoAzar, frase);
    }

    
}
