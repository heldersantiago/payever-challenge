import { Module } from '@nestjs/common';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';

@Module({
  imports: [ApplicationModule, DomainModule, InfrastructureModule],
  providers: [],
})
export class InvoiceModule {}
