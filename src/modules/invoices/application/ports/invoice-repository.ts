import { Invoice } from '../../domain/entities/invoice.entity';
import { CreateInvoiceDto } from '../../interfaces/dtos/create-invoice-dto';
export interface InvoiceRepository {
  save(invoice: CreateInvoiceDto): Promise<Invoice>;
  findById(id: string): Promise<Invoice | null>;
  findAll(): Promise<Invoice[]>;
  findAllForToday(): Promise<Invoice[]>;
}
