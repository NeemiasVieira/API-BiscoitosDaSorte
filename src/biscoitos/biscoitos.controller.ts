import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { BiscoitosService } from './biscoitos.service';
import { frasesDaSorte, frasesDoAzar } from './biscoitosParaPopular';
import { BiscoitosDaSorte } from './models/biscoitoDaSorte.model';
import { BiscoitosDoAzar } from './models/biscoitoDoAzar.model';
import { Response } from 'express';

@Controller('biscoitos')
export class BiscoitosController {
    constructor(private readonly appservice: BiscoitosService) { }

    @Get()
    async listarTodosOsBiscoitos(): Promise<object> {
        return await this.appservice.listarTodosOsBiscoitos();
    }

    @Get('/sorte')
    async pegarBiscoitosDaSorte(): Promise<string> {
        return await this.appservice.pegarBiscoitosDaSorte();
    }

    @Get('/azar')
    async pegarBiscoitosDoAzar(): Promise<string> {
        return await this.appservice.pegarBiscoitosDoAzar();
    }

    @Post('/sorte/criar')
    criarFraseDaSorte(@Body() body: { frase: string }): Promise<string> {
        const frase = body.frase;
        return this.appservice.criarBiscoitoDaSorte(frase);
    }

    @Post('/azar/criar')
    criarBiscoitoDoAzar(@Body() body: { frase: string }): Promise<string> {
        const frase = body.frase
        return this.appservice.criarBiscoitoDoAzar(frase);
    }

    @Post('/sorte/pesquisar')
    async pesquisarBiscoitoDaSorte(@Body() body: { frase: string }, @Res() res : Response): Promise<void> {
        const frase = body.frase;
        const resposta = this.appservice.pesquisarBiscoitoDaSorte(frase)
        res.status(200).send(resposta);
    }
    @Post('/azar/pesquisar')
    async pesquisarBiscoitoDoAzar(@Body() body: { frase: string }, @Res() res : Response): Promise<void> {
        const frase = body.frase;
        const resposta = this.appservice.pesquisarBiscoitoDoAzar(frase)
        res.status(200).send(resposta);
    }

    @Post('populardatabase')
    async inserirTodosOsBiscoitos(): Promise<string> {
      let biscoito: string;
      for (biscoito of frasesDaSorte) {
        const objetoParaCriar = { biscoitoDaSorte: biscoito };
        await BiscoitosDaSorte.create(objetoParaCriar);
      }
      let biscoito2: string
      for (biscoito2 of frasesDoAzar) {
        const objetoParaCriar = { biscoitosDoAzar: biscoito };
        console.log(biscoito)
        await BiscoitosDoAzar.create(objetoParaCriar);
      }
      return "adicionado com sucesso";
    }
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
