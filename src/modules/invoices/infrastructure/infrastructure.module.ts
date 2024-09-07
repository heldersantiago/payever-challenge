import { forwardRef, Module } from '@nestjs/common';
import { InvoicesController } from './controllers/invoice.controller';
import { InvoiceRepositoryImpl } from './repositories/invoice.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice } from './schemas/invoice.schema';
import { InvoiceSchema } from './schemas/invoice-item.schema';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: InvoiceSchema }]),
    forwardRef(() => ApplicationModule),
  ],
  controllers: [InvoicesController],
  providers: [InvoiceRepositoryImpl],
  exports: [InvoiceRepositoryImpl],
})
export class InfrastructureModule {}
