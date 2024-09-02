import { forwardRef, Module } from '@nestjs/common';
import { InvoicesService } from './services/invoice.service';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';

@Module({
  imports: [forwardRef(() => InfrastructureModule)],
  providers: [InvoicesService],
  exports: [InvoicesService],
})
export class ApplicationModule {}
