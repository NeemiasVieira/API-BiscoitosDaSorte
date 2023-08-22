import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroGlobalDeExcecoes } from './erros';
import { BiscoitosDaSorteModule } from './biscoitos-da-sorte/biscoitos-da-sorte.module';
import { BiscoitosDoAzarModule } from './biscoitos-do-azar/biscoitos-do-azar.module';

@Module({
  imports: [DatabaseModule, FeedbacksModule, BiscoitosDaSorteModule, BiscoitosDoAzarModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: FiltroGlobalDeExcecoes,
  }],
})
export class AppModule {}
