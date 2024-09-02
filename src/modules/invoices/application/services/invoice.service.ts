import { Injectable, NotFoundException } from '@nestjs/common';
import { Invoice } from '../../domain/entities/invoice.entity';
import { InvoiceRepositoryImpl } from '../../infrastructure/repositories/invoice.repository';

@Injectable()
export class InvoicesService {
  constructor(private readonly invoiceRepository: InvoiceRepositoryImpl) {}

  async create(createInvoiceDto: Invoice): Promise<Invoice> {
    const newInvoice = await this.invoiceRepository.save(createInvoiceDto);
    return newInvoice;
  }

  async findById(id: string): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findById(id);
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    return invoice;
  }

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceRepository.findAll();
  }
}
