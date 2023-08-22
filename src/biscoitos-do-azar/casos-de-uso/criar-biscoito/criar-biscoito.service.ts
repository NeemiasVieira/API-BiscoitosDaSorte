import { Injectable } from '@nestjs/common';
import { BiscoitosDoAzar } from 'src/biscoitos-do-azar/biscoitos-do-azar.model';
import { TratarErro } from 'src/erros';

@Injectable()
export class CriarBiscoitoService {

    async criarBiscoitoDoAzar(frase: string): Promise<string> {
        //Verifica se o biscoito já existe no banco de dados
        const biscoitoJaExiste = await BiscoitosDoAzar.findOne({ where: { mensagem: frase } });
        if (biscoitoJaExiste) throw new TratarErro(400, "O biscoito já existe");
        //Caso não exista um biscoito igual, o biscoito é criado
        await BiscoitosDoAzar.create({ mensagem: frase });
        return `O biscoito do azar com a frase: "${frase}" foi adicionado com sucesso!`;
    }
    
}
