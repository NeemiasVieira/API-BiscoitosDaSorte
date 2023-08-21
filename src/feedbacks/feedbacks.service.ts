import { Injectable } from '@nestjs/common';
import { Feedbacks } from './feedback.model';
import { TratarErro } from 'src/erros';


interface feedbacks{
    nota: number,
    mensagem: string
}

@Injectable()
export class FeedbacksService {

    async listarFeedbacks() : Promise<object[]> {  
        let feedbacks = await Feedbacks.findAll()
        const feedbacksFormatados = feedbacks.map((feedback) => {
            return {id: feedback.id, nota: feedback.nota, mensagem: feedback.mensagem}
        })
        return feedbacksFormatados;
    }     
 
    async criarFeedback(feedback: feedbacks) : Promise<string>{
        const {nota, mensagem} = feedback;
        await Feedbacks.create({nota, mensagem});
        return `O feedback foi enviado com sucesso!`
    }

    async excluirFeedback(id: number) : Promise<void> {
        const feedbackExiste = await Feedbacks.findOne({where: {id}})
        if(!feedbackExiste){
            throw new TratarErro(404, "O ID que você tentou excluir não existe");
        }
        await Feedbacks.destroy({where: {id}});
        
    }
}
