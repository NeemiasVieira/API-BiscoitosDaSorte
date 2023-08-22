import { Injectable } from '@nestjs/common';
import { BiscoitosDaSorte } from './biscoitos-da-sorte/BiscoitoDaSorte.model';
import { BiscoitosDoAzar } from './biscoitos-do-azar/biscoitos-do-azar.model';

@Injectable()
export class AppService {
  async listarTodosOsBiscoitos(): Promise<object> {

    //Puxa todos os bicoitos do banco de dados
    const biscoitosDaSorte = await BiscoitosDaSorte.findAll({ attributes: ['mensagem'] });
    const biscoitosDoAzar = await BiscoitosDoAzar.findAll({ attributes: ['mensagem'] });

    //Pega apenas os valores dos biscoitos sem as chaves    
    const frasesBiscoitosDaSorte = biscoitosDaSorte.map(biscoito => biscoito.mensagem);
    const frasesBiscoitosDoAzar = biscoitosDoAzar.map(biscoito => biscoito.mensagem);
    
    return { biscoitosDaSorte: frasesBiscoitosDaSorte, biscoitosDoAzar: frasesBiscoitosDoAzar };
}
}
