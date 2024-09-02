import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GenerateDailySalesSummaryUseCase } from '../../application/use-cases/generate-daily-sales-summary.use-case';
import { RabbitMQPublisher } from '../messaging/rabbitmq.publisher';

@Injectable()
export class CronService {
  constructor(
    private readonly generateDailySalesSummaryUseCase: GenerateDailySalesSummaryUseCase,
    private readonly rabbitMQPublisher: RabbitMQPublisher,
  ) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    const summary = 'Iniciado com sucesso';
    Logger.log('Long enviado com sucesso');
    console.log('Message sent');
    await this.rabbitMQPublisher.publish('daily_sales_report', summary);
  }
}
