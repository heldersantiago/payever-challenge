import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { InvoicesService } from '../../application/services/invoice.service';
import { CreateInvoiceDto } from '../../interfaces/dtos/create-invoice-dto';
import { Invoice } from '../../domain/entities/invoice.entity';

@Controller('api/v1/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  createInvoice(@Body() createInvoiceDto: Invoice) {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get(':id')
  getInvoiceById(@Param('id') id: string) {
    return this.invoicesService.findById(id);
  }

  @Get()
  getAllInvoices() {
    return this.invoicesService.findAll();
  }
}
