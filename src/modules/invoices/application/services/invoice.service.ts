import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Invoice } from '../../domain/entities/invoice.entity';
import { InvoiceRepositoryImpl } from '../../infrastructure/repositories/invoice.repository';
import { CreateInvoiceDto } from '../../interfaces/dtos/create-invoice-dto';
import { Types } from 'mongoose';

@Injectable()
export class InvoicesService {
  constructor(private readonly invoiceRepository: InvoiceRepositoryImpl) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const newInvoice = await this.invoiceRepository.save(createInvoiceDto);
    return newInvoice;
  }

  async findById(id: string): Promise<Invoice> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid ID format');
    }
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
