import { Injectable } from '@nestjs/common';
import { InvoiceRepositoryImpl } from '../../infrastructure/repositories/invoice.repository';

@Injectable()
export class GenerateDailySalesSummaryUseCase {
  constructor(private readonly invoiceRepository: InvoiceRepositoryImpl) {}

  async execute(): Promise<any> {
    const invoices = await this.invoiceRepository.findAllForToday();
    const totalSales = invoices.reduce(
      (sum, invoice) => sum + invoice.amount,
      0,
    );

    const itemSalesSummary = invoices
      .flatMap((invoice) => invoice.items)
      .reduce((summary, item) => {
        if (!summary[item.sku]) {
          summary[item.sku] = 0;
        }
        summary[item.sku] += item.qt;
        return summary;
      }, {});

    return {
      totalSales,
      itemSalesSummary,
    };
  }
}
