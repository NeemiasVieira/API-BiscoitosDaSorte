import { Injectable } from '@nestjs/common';
import { TratarErro } from 'src/erros';
import { BiscoitosDaSorte } from 'src/biscoitos-da-sorte/BiscoitoDaSorte.model';

@Injectable()
export class CriarBiscoitoService {
    async criarBiscoitoDaSorte(frase: string): Promise<string> {
        //Verifica se o biscoito já existe no banco de dados
        const biscoitoJaExiste = await BiscoitosDaSorte.findOne({ where: { mensagem: frase } });
        if (biscoitoJaExiste) throw new TratarErro(400, "O biscoito já existe");
        //Caso não exista um biscoito igual, o biscoito é criado
        await BiscoitosDaSorte.create({ mensagem: frase });
        return `O biscoito com a frase: "${frase}" foi adicionado com sucesso!`;
    }
}
