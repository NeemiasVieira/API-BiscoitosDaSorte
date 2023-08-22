import { Module } from '@nestjs/common';
import { PesquisarBiscoitoController } from './casos-de-uso/pesquisar-biscoito/pesquisar-biscoito.controller';
import { PesquisarBiscoitoService } from './casos-de-uso/pesquisar-biscoito/pesquisar-biscoito.service';
import { PegarBiscoitoService } from './casos-de-uso/pegar-biscoito/pegar-biscoito.service';
import { PegarBiscoitoController } from './casos-de-uso/pegar-biscoito/pegar-biscoito.controller';
import { CriarBiscoitoController } from './casos-de-uso/criar-biscoito/criar-biscoito.controller';
import { CriarBiscoitoService } from './casos-de-uso/criar-biscoito/criar-biscoito.service';

@Module({
  controllers: [PegarBiscoitoController, PesquisarBiscoitoController, CriarBiscoitoController],
  providers: [PegarBiscoitoService, PesquisarBiscoitoService, CriarBiscoitoService]
})
export class BiscoitosDoAzarModule {}
