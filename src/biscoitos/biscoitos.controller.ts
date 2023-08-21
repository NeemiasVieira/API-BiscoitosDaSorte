import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BiscoitosService } from './biscoitos.service';
import { tratarErro } from 'src/erros';

@Controller('biscoitos')
export class BiscoitosController {
    constructor(private readonly appservice: BiscoitosService) {}    

    //Rota que lista todos os biscoitos
    @Get()
    async listarTodosOsBiscoitos(): Promise<object> {
        return await this.appservice.listarTodosOsBiscoitos();
    }

    //Rota que pega um biscoito da sorte aleatório
    @Get('/sorte')
    async pegarBiscoitosDaSorte(): Promise<string> {
        return await this.appservice.pegarBiscoitosDaSorte();
    }

    //Rota que pega um biscoito do azar aleatório
    @Get('/azar')
    async pegarBiscoitosDoAzar(): Promise<string> {
        return await this.appservice.pegarBiscoitosDoAzar();
    }

    //Rota para criar um biscoito da sorte
    @Post('/sorte/criar')
    criarFraseDaSorte(@Body() body: { frase: string }): Promise<string> {
        const frase = body.frase;
        return this.appservice.criarBiscoitoDaSorte(frase);
    }

    //Rota para criar um biscoito da azar
    @Post('/azar/criar')
    criarBiscoitoDoAzar(@Body() body: { frase: string }): Promise<string> {
        const frase = body.frase
        return this.appservice.criarBiscoitoDoAzar(frase);
    }

    //Rota para pesquisar um biscoito da sorte
    @Post('/sorte/pesquisar')
    async pesquisarBiscoitoDaSorte(@Body() body: { frase: string }, @Res() res : Response): Promise<void> {
        const frase = body.frase;
        const resposta = await this.appservice.pesquisarBiscoitoDaSorte(frase);
        res.status(200).send(resposta);
    }

    //Rota para pesquisar um biscoito do azar
    @Post('/azar/pesquisar')
    async pesquisarBiscoitoDoAzar(@Body() body: { frase: string }, @Res() res : Response): Promise<void> {
        const frase = body.frase;
        const resposta = await this.appservice.pesquisarBiscoitoDoAzar(frase);
        res.status(200).send(resposta);
    }

    //Rota para popular o banco de dados
    // @Post('populardatabase')
    // async inserirTodosOsBiscoitos(): Promise<string> {
    //   let biscoito: string;
    //   for (biscoito of frasesDaSorte) {
    //     const objetoParaCriar = { biscoitoDaSorte: biscoito };
    //     await BiscoitosDaSorte.create(objetoParaCriar);
    //   }
    //   let biscoito2: string
    //   for (biscoito2 of frasesDoAzar) {
    //     const objetoParaCriar = { biscoitosDoAzar: biscoito2 };
    //     await BiscoitosDoAzar.create(objetoParaCriar);
    //   }
    //   return "adicionado com sucesso";
    // }

}
