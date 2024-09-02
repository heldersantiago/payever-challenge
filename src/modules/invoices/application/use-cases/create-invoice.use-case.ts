import { Injectable } from '@nestjs/common';
import { Invoice } from '../../domain/entities/invoice.entity';
import { CreateInvoiceDto } from '../../interfaces/dtos/create-invoice-dto';
import { InvoiceItem } from '../../domain/entities/invoice-item.entity';

@Injectable()
export class CreateInvoiceUseCase {
  constructor(private readonly invoiceRepository: any) {}
  async execute(createInvoiceDTO: CreateInvoiceDto): Promise<any> {
    const invoice = new Invoice(
      null,
      createInvoiceDTO.customer,
      createInvoiceDTO.amount,
      createInvoiceDTO.reference,
      new Date(),
      createInvoiceDTO.items.map((item) => new InvoiceItem(item.sku, item.qt)),
    );
    return await this.invoiceRepository.save(invoice);
  }
}
