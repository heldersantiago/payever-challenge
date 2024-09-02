import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InvoiceRepository } from '../../application/ports/invoice-repository';
import { Invoice } from '../../domain/entities/invoice.entity';
import { InvoiceDocument } from '../schemas/invoice.schema';

export class InvoiceRespositoryImpl implements InvoiceRepository {
  constructor(
    @InjectModel(Invoice.name)
    private readonly invoiceModel: Model<InvoiceDocument>,
  ) {}
  
  async save(invoice: Invoice): Promise<Invoice> {
    const createdInvoice = new this.invoiceModel(invoice);
    return createdInvoice.save();
  }

  async findById(id: string): Promise<Invoice | null> {
    return this.invoiceModel.findById(id).exec();
  }  

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.find().exec();
  }
}
