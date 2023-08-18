import { Body, Controller, Get, Post } from '@nestjs/common';
import { BiscoitosService } from './biscoitos.service';

@Controller('biscoitos')
export class BiscoitosController {
    constructor(private readonly appservice: BiscoitosService) { }

    @Get()
    async listarTodos(): Promise<object> {
        return await this.appservice.getTodososBiscoitos();
    }

    @Get('/sorte')
    async pegarBiscoitosDaSorte(): Promise<string> {
        return await this.appservice.getBiscoitoDaSorte();
    }

    @Get('/azar')
    async pegarBiscoitosDoAzar(): Promise<string> {
        return await this.appservice.getBiscoitoDoAzar();
    }

    @Post('/sorte/criar')
    criarFraseDaSorte(@Body() body: { frase: string }): Promise<string> {
        const frase = body.frase;
        return this.appservice.criarFraseDaSorte(frase);
    }

    @Post('/azar/criar')
    criarFraseDoAzar(@Body() body: { frase: string }): Promise<string> {
        const frase = body.frase
        return this.appservice.criarFraseDoAzar(frase);
    }

    @Post('/sorte/buscar')
    buscarBiscoitoDaSorte(@Body() body: { frase: string }): Promise<string> {
        const frase = body.frase;
        return this.appservice.buscarBiscoitoDaSorte(frase);
    }
    @Post('/azar/buscar')
    buscarBiscoitoDoAzar(@Body() body: { frase: string }): Promise<string> {
        const frase = body.frase;
        return this.appservice.buscarBiscoitoDoAzar(frase);
    }

    // @Post()
    // async inserirTodosOsBiscoitos(): Promise<string> {
    //   let biscoito: string;
    //   for (biscoito of frasesBiscoitodaSorte) {
    //     const objetoParaCriar = { biscoitoDaSorte: biscoito };
    //     await BiscoitosDaSorte.create(objetoParaCriar);
    //   }
    //   return "adicionado com sucesso";
    // }
    // @Post()
    // async inserirTodosOsBiscoitos(): Promise<string> {
    //   let biscoito: string;
    //   for (biscoito of frasesDeBiscoitoDoAzar) {
    //     const objetoParaCriar = { biscoitosDoAzar: biscoito };
    //     console.log(biscoito)
    //     await BiscoitosDoAzar.create(objetoParaCriar);
    //   }
    //   return "adicionado com sucesso";
    // }
}
