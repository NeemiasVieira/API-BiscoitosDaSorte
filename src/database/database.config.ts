import { Sequelize } from 'sequelize-typescript';
import { Feedbacks } from 'src/feedbacks/feedback.model';
import { BiscoitosDaSorte } from 'src/biscoitos/models/biscoitoDaSorte.model';
import { BiscoitosDoAzar } from 'src/biscoitos/models/biscoitoDoAzar.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'biscoitos-da-sorte.postgres.database.azure.com',
        port: 5432, // A porta padrão do PostgreSQL
        username: 'neemias',
        password: 'SenhaDoBanco987@_',
        database: 'postgres',
        dialectOptions: {
          ssl: {      require: true, 
          }
      }});
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