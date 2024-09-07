import { SchemaFactory, Prop } from '@nestjs/mongoose';
import { Invoice } from './invoice.schema';

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
export class InvoiceItem {
  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  qt: number;
}
