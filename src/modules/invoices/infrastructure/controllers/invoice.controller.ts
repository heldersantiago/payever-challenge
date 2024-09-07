import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { InvoicesService } from '../../application/services/invoice.service';
import { CreateInvoiceDto } from '../../interfaces/dtos/create-invoice-dto';

@Controller('api/v1/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    try {
      return this.invoicesService.create(createInvoiceDto);
    } catch (error) {
      return { error };
    }
  }

  @Get(':id')
  getInvoiceById(@Param('id') id: string) {
    try {
      return this.invoicesService.findById(id);
    } catch (error) {
      return { error };
    }
  }

  @Get()
  getAllInvoices() {
    return this.invoicesService.findAll();
  }
}
