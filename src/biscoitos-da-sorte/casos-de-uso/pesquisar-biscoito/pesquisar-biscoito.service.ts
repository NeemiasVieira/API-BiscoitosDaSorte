import { Injectable } from '@nestjs/common';
import { TratarErro } from 'src/erros';
import { BiscoitosDaSorte } from 'src/biscoitos-da-sorte/BiscoitoDaSorte.model';

//Função que recebe uma busca e um array, e faz a pesquisa dentro deste array
export const pesquisarFrase = (arrayDeStrings: string[], stringBuscada: string): { resultados_encontrados: any } => {
    const resultados = arrayDeStrings.filter(elemento => elemento.includes(stringBuscada));

    if (resultados.length > 0) {
        return { resultados_encontrados: resultados };
    } else {
        throw new TratarErro(404, "Nenhum resultado encontrado =(");
    }
};

@Injectable()
export class PesquisarBiscoitoService {

    async pesquisarBiscoitoDaSorte(frase: string): Promise<object> {
        let biscoitos = await BiscoitosDaSorte.findAll();
        let frasesDaSorte: string[] = biscoitos.map((biscoito) => biscoito.mensagem);
        const resultado = pesquisarFrase(frasesDaSorte, frase);
        return resultado;
    }

}
