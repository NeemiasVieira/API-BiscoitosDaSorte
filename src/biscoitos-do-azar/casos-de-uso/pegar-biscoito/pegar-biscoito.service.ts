import { Injectable } from '@nestjs/common';
import { fraseAleatoria } from 'src/biscoitos-da-sorte/casos-de-uso/pegar-biscoito/pegar-biscoito.service';
import { BiscoitosDoAzar } from 'src/biscoitos-do-azar/biscoitos-do-azar.model';

@Injectable()
export class PegarBiscoitoService {

    async pegarBiscoitosDoAzar(): Promise<string> {
        const biscoitosDoAzar = await BiscoitosDoAzar.findAll();
        const frasesBiscoitosDoAzar: string[] = biscoitosDoAzar.map((biscoito) => biscoito.mensagem);
        return fraseAleatoria(frasesBiscoitosDoAzar);
    }
}
