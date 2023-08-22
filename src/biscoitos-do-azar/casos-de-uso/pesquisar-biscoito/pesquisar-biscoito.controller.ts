import { Controller } from '@nestjs/common';
import { Post, Res, Body } from '@nestjs/common';
import { Response } from 'express';
import { PesquisarBiscoitoService } from './pesquisar-biscoito.service';
import { TratarErro } from 'src/erros';

@Controller('biscoitos')
export class PesquisarBiscoitoController {

    constructor(private readonly service: PesquisarBiscoitoService){}

 //Rota para pesquisar um biscoito do azar
 @Post('/azar/pesquisar')
 async pesquisarBiscoitoDoAzar(@Body() body: { frase: string }, @Res() res : Response): Promise<void> {
     const frase = body.frase;
     if(!frase) throw new TratarErro(400, "O campo frase é obrigatório");
     const resposta = await this.service.pesquisarBiscoitoDoAzar(frase);
     res.status(200).send(resposta);
 }

}
