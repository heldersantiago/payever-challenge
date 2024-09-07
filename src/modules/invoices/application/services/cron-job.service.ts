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

  @Cron(CronExpression.EVERY_DAY_AT_NOON)
  async handleCron() {
    const summary = this.generateDailySalesSummaryUseCase.execute();
    await this.rabbitMQPublisher.publish('daily_sales_report', summary);
  }
}
