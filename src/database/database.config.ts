import { Sequelize } from 'sequelize-typescript';
import { Feedbacks } from 'src/feedbacks/feedback.model';
import { BiscoitosDaSorte } from 'src/biscoitos-da-sorte/BiscoitoDaSorte.model';
import { BiscoitosDoAzar } from 'src/biscoitos-do-azar/biscoitos-do-azar.model';
import pg from 'pg';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.HOST,
        port: 5432, // A porta padrão do PostgreSQL
        username: process.env.USER,
        password: process.env.PASSWORD,
        database: 'postgres',
        dialectModule: pg, //Necessário para o deploy na vercel
        dialectOptions: { //Necessário para usar o servidor Postgre no Azure
          ssl: {      require: true, 
          }
      }
    });
      sequelize.addModels([Feedbacks, BiscoitosDaSorte, BiscoitosDoAzar])
      await sequelize.sync();
      try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso 🚀');
      } catch (erro) {
        console.error('Conexão com o banco de dados falhou', erro);
      }
    },
  },
];