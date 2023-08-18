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
        host: 'localhost',
        port: 5432, // A porta padrão do PostgreSQL
        username: 'postgres',
        password: '123456',
        database: 'postgres',      

      });
      sequelize.addModels([Feedbacks, BiscoitosDaSorte, BiscoitosDoAzar])
      await sequelize.sync();
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
    },
  },
];