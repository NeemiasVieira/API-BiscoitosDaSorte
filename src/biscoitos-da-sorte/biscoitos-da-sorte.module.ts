import { Module } from '@nestjs/common';
import { PegarBiscoitoController } from './casos-de-uso/pegar-biscoito/pegar-biscoito.controller';
import { CriarBiscoitoController } from './casos-de-uso/criar-biscoito/criar-biscoito.controller';
import { PegarBiscoitoService } from './casos-de-uso/pegar-biscoito/pegar-biscoito.service';
import { CriarBiscoitoService } from './casos-de-uso/criar-biscoito/criar-biscoito.service';
import { PesquisarBiscoitoController } from './casos-de-uso/pesquisar-biscoito/pesquisar-biscoito.controller';
import { PesquisarBiscoitoService } from './casos-de-uso/pesquisar-biscoito/pesquisar-biscoito.service';

@Module({
  controllers: [PegarBiscoitoController, CriarBiscoitoController, PesquisarBiscoitoController],
  providers: [PegarBiscoitoService, CriarBiscoitoService, PesquisarBiscoitoService]
})
export class BiscoitosDaSorteModule {


  

 

}
