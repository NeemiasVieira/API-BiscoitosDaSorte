import { Controller } from '@nestjs/common';
import { Post, Body } from '@nestjs/common';
import { CriarBiscoitoService } from './criar-biscoito.service';
import { TratarErro } from 'src/erros';

@Controller('biscoitos')
export class CriarBiscoitoController {

    constructor(private readonly service: CriarBiscoitoService){}

//Rota para criar um biscoito da azar
@Post('/azar/criar')
criarBiscoitoDoAzar(@Body() body: { frase: string }): Promise<string> {
    const frase = body.frase
    if(!frase) throw new TratarErro(400, "O campo frase é obrigatório");
    return this.service.criarBiscoitoDoAzar(frase);
}

}
