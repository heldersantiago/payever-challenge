import { forwardRef, Module } from '@nestjs/common';
import { InvoicesService } from './services/invoice.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { CronService } from './services/cron-job.service';
import { GenerateDailySalesSummaryUseCase } from './use-cases/generate-daily-sales-summary.use-case';
import { RabbitMQPublisher } from './messaging/rabbitmq.publisher';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    forwardRef(() => InfrastructureModule),
    ClientsModule.register([
      {
        name: 'INVOICES_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URI],
          queue: 'daily_sales_report',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
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
