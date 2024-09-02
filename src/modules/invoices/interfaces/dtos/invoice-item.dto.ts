import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class InvoiceItemDto {
  @IsString()
  @IsNotEmpty()
  sku: string;

  @IsNumber()
  qt: number;
}
