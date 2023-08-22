import { Controller, Get } from '@nestjs/common';
import { PegarBiscoitoService } from './pegar-biscoito.service';

@Controller('biscoitos')
export class PegarBiscoitoController {
  constructor(private readonly service: PegarBiscoitoService){}
    //Rota que pega um biscoito da sorte aleatório
  @Get('/sorte')
  async pegarBiscoitosDaSorte(): Promise<string> {
      return await this.service.pegarBiscoitosDaSorte();
  }
}
