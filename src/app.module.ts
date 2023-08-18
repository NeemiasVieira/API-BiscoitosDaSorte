import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BiscoitosModule } from './biscoitos/biscoitos.module';
import { FeedbacksModule } from './feedbacks/feedbacks.module';

@Module({
  imports: [DatabaseModule, BiscoitosModule, FeedbacksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
