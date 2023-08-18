import { Body, Controller, Post, Res, Delete, Get } from '@nestjs/common';
import { FeedbacksService } from './feedbacks.service';
import { Response } from 'express';


@Controller('feedbacks')
export class FeedbacksController {
    constructor(private readonly appservice: FeedbacksService){}

    @Get()
    getFeedbacks() : Promise<object[]>{
        return this.appservice.getFeedbacks();
    }

    @Post()
    colherFeedbacks(@Body() body: { nota: number, mensagem: string }, @Res() res: Response) : void{
        const { nota, mensagem } = body;
        res.send(this.appservice.colherFeedbacks({nota, mensagem})).status(201);
    }

    @Delete('/delete')
    deletarConteudo(@Res() res: Response): void {
        // feedbacks.pop();
        // console.log(feedbacks);
        res.status(204)
    }

    // @Patch('/atualizar')
    // atualizarConteudo(@Res() res: Response, @Body() body : {livroInserido: string, posicao : number}) : void{
    //     const {livroInserido, posicao} = body;
    //     feedbacks.splice(posicao, 1, livroInserido);
    //     console.log(feedbacks)
    //     res.status(201).send();
    // }

}
