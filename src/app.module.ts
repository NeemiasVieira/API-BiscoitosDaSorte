import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BiscoitosModule } from './biscoitos/biscoitos.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';
import { APP_FILTER } from '@nestjs/core';
import { FiltroGlobalDeExcecoes } from './erros';

@Module({
  imports: [DatabaseModule, BiscoitosModule, FeedbacksModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_FILTER,
    useClass: FiltroGlobalDeExcecoes,
  }],
})
export class AppModule {}
