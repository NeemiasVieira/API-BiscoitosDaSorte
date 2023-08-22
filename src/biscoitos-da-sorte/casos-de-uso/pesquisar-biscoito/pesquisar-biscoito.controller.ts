import { Controller } from '@nestjs/common';
import { Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { PesquisarBiscoitoService } from './pesquisar-biscoito.service';
import { TratarErro } from 'src/erros';

@Controller('biscoitos')
export class PesquisarBiscoitoController {
    constructor(private readonly service: PesquisarBiscoitoService){}

//Rota para pesquisar um biscoito da sorte
@Post('/sorte/pesquisar')
async pesquisarBiscoitoDaSorte(@Body() body: { frase: string }, @Res() res : Response): Promise<void> {
    const frase = body.frase;
    if(!frase) throw new TratarErro(400, "O campo frase é obrigatório");
    const resposta = await this.service.pesquisarBiscoitoDaSorte(frase);
    res.status(200).send(resposta);
}

}
