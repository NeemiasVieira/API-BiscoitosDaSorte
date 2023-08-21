import { HttpException, HttpStatus } from '@nestjs/common';
import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';

export class TratarErro extends HttpException {
  constructor(statuscode: HttpStatus, mensagem: string) {
    super(mensagem, statuscode);
  }
}

@Catch(HttpException)
export class FiltroGlobalDeExcecoes implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        Rota: request.url,
        Codigo_HTTP: status,
        Mensagem_de_Erro: exception.message,
      });
  }
}