import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { PegarBiscoitoService } from './pegar-biscoito.service';

@Controller('biscoitos')
export class PegarBiscoitoController {

    constructor(private readonly service: PegarBiscoitoService){}
    //Rota que pega um biscoito do azar aleatório
    @Get('/azar')
    async pegarBiscoitosDoAzar(): Promise<string> {
        return await this.service.pegarBiscoitosDoAzar();
    }
}
