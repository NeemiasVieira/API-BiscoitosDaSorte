import { Injectable } from '@nestjs/common';
import { Feedbacks } from './feedback.model';

interface feedbacks{
    nota: number,
    mensagem: string
}

@Injectable()
export class FeedbacksService {

    async getFeedbacks() : Promise<object[]> {  
        let feedbacks = await Feedbacks.findAll()
        const feedbacksFormatados = feedbacks.map((feedback) => {
            return {nota: feedback.nota, mensagem: feedback.mensagem}
        })
        return feedbacksFormatados;
    }     
 

    async colherFeedbacks(feedback: feedbacks) {
        const {nota, mensagem} = feedback;
        await Feedbacks.create({nota, mensagem});
        return {nota, mensagem}
    }
}
