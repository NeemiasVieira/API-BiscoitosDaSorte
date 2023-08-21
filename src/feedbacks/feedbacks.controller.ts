import { Body, Controller, Post, Res, Delete, Get, Param } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { Response } from 'express';


@Controller('feedbacks')
export class FeedbacksController {
    constructor(private readonly appservice: FeedbacksService){}

    @Get()
    listarFeedbacks() : Promise<object[]>{
        return this.appservice.listarFeedbacks();
    }

    @Post()
    async criarFeedback(@Body() body: { nota: number, mensagem: string }, @Res() res: Response) : Promise<void>{
        const { nota, mensagem } = body;
        res.status(201).send(await this.appservice.criarFeedback({nota, mensagem}));
    }

    @Delete('/excluir/:id')
    async excluirFeedback(@Res() res: Response, @Param('id') id: number): Promise<void> {
        await this.appservice.excluirFeedback(id)
        res.status(204).send();
    }
}
