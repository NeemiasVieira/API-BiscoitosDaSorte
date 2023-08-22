import { Body, Controller, Post, Res, Delete, Get, Param, Patch} from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { Response } from 'express';
import { TratarErro } from 'src/erros';


@Controller('feedbacks')
export class FeedbacksController {
    constructor(private readonly service: FeedbacksService){}

    @Get()
    listarFeedbacks() : Promise<object[]>{
        return this.service.listarFeedbacks();
    }

    @Post()
    async criarFeedback(@Body() body: { nota: number, mensagem: string }, @Res() res: Response) : Promise<void>{
        const { nota, mensagem } = body;
        if (!nota || !mensagem) throw new TratarErro(400, "Os campos nota e mensagem são obrigatórios!");
        res.status(201).send(await this.service.criarFeedback({nota, mensagem}));
    }

    @Delete('/excluir/:id')
    async excluirFeedback(@Res() res: Response, @Param('id') id: number): Promise<void> {
        await this.service.excluirFeedback(id)
        res.status(204).send();
    }

    @Patch('/atualizar/:id')
    async atualizarFeedback(@Body() body : {nota: number, mensagem: string}, @Param('id') id: number, @Res() res: Response){
        const {nota, mensagem } = body; 
        const resposta = await this.service.atualizarFeedback(id, nota, mensagem);
        res.status(200).send(resposta);
    }
}
