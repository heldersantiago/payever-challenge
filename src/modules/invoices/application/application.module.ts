import { forwardRef, Module } from '@nestjs/common';
import { InvoicesService } from './services/invoice.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CronService } from './services/cron-job.service';
import { GenerateDailySalesSummaryUseCase } from './use-cases/generate-daily-sales-summary.use-case';
import { RabbitMQPublisher } from './messaging/rabbitmq.publisher';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [forwardRef(() => InfrastructureModule), ScheduleModule.forRoot({})],
  providers: [
    InvoicesService,
    CronService,
    GenerateDailySalesSummaryUseCase,
    RabbitMQPublisher,
  ],
  exports: [
    InvoicesService,
    CronService,
    RabbitMQPublisher,
    GenerateDailySalesSummaryUseCase,
  ],
})
export class ApplicationModule {}
