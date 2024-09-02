import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceRepository } from '../../application/ports/invoice-repository';
import { InvoiceDocument } from '../schemas/invoice.schema';
import { Invoice } from '../../domain/entities/invoice.entity';
import { CreateInvoiceDto } from '../../interfaces/dtos/create-invoice-dto';

export class InvoiceRepositoryImpl implements InvoiceRepository {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}

  async save(invoice: CreateInvoiceDto): Promise<any> {
    const createdInvoice = new this.invoiceModel(invoice);
    const savedInvoice = await createdInvoice.save();
    return savedInvoice; // Convert to plain object and cast to Invoice
  }

  async findById(id: string): Promise<any> {
    const invoice = await this.invoiceModel.findById(id).exec();
    return invoice;
  }

  async findAll(): Promise<any> {
    const invoices = await this.invoiceModel.find().exec();
    return invoices;
  }
}
