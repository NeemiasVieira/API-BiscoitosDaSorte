import { Injectable } from '@nestjs/common';
import { BiscoitosDoAzar } from 'src/biscoitos-do-azar/biscoitos-do-azar.model';
import { pesquisarFrase } from 'src/biscoitos-da-sorte/casos-de-uso/pesquisar-biscoito/pesquisar-biscoito.service';

@Injectable()
export class PesquisarBiscoitoService {

    async pesquisarBiscoitoDoAzar(frase: string): Promise<object> {
        let biscoitos = await BiscoitosDoAzar.findAll();
        let frasesDoAzar: string[] = biscoitos.map((biscoito) => biscoito.mensagem);
        const resultado = pesquisarFrase(frasesDoAzar, frase);
        return resultado;
    }
}
