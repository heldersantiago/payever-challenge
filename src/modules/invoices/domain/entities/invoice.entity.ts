import { InvoiceItem } from './invoice-item.entity';

export class Invoice {
  constructor(
    public readonly id: string,
    public readonly customer: string,
    public readonly amount: number,
    public readonly reference: string,
    public readonly date: Date,
    public readonly items: InvoiceItem[],
  ) {}
}
