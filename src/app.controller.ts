import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('biscoitos')
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Rota que lista todos os biscoitos
  @Get()
  async listarTodosOsBiscoitos(): Promise<object> {
      return await this.appService.listarTodosOsBiscoitos();
  }

}
