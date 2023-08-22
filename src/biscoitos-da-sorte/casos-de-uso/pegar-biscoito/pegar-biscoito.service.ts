import { Injectable } from '@nestjs/common';
import { BiscoitosDaSorte } from 'src/biscoitos-da-sorte/BiscoitoDaSorte.model';

//Função que retorna o valor de um indice aleatório de um array
export const fraseAleatoria = (array: Array<string>): string => {
    const min = 0;
    const max = array.length -1;
    //Pesquisar métodos mais eficazes de indice aleatórios, falar com o Pedro
    const indiceAleatorio = Math.floor(Math.random() * (max - min +1) + min);
    return array[indiceAleatorio];
}

@Injectable()
export class PegarBiscoitoService {

    async pegarBiscoitosDaSorte(): Promise<string> {
        const biscoitosDaSorte = await BiscoitosDaSorte.findAll();
        const frasesBiscoitosDaSorte = biscoitosDaSorte.map((biscoito) => biscoito.mensagem);
        return fraseAleatoria(frasesBiscoitosDaSorte);
    }
}
