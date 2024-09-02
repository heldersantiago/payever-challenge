import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from '../../application/services/invoice.service';
import { InvoicesController } from './invoice.controller';
import { Invoice } from '../../domain/entities/invoice.entity';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let service: InvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        {
          provide: InvoicesService,
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController);
    service = module.get<InvoicesService>(InvoicesService);
  });

  describe('getAllInvoices', () => {
    it('should return a list of invoices', async () => {
      const invoices = [
        {
          customer: 'John Doe',
          amount: 100,
          reference: 'REF123',
          items: [{ sku: 'SKU123', qt: 2 }],
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(invoices as Invoice[]);

      expect(await controller.getAllInvoices()).toBe(invoices);
    });
  });

  describe('create invoice', () => {
    it('should create a new invoice', async () => {
      const createInvoiceDto = {
        customer: 'John Doe',
        amount: 100,
        reference: 'REF123',
        items: [{ sku: 'SKU123', qt: 2 }],
      };
      const newInvoice = {
        customer: 'John Doe',
        amount: 100,
        reference: 'REF123',
        items: [{ sku: 'SKU123', qt: 2 }],
        id: 'invoiceId',
      };
      jest.spyOn(service, 'create').mockResolvedValue(newInvoice as Invoice);

      expect(await controller.createInvoice(createInvoiceDto)).toBe(newInvoice);
    });

    it('should not create a new invoice', async () => {
      const createInvoiceDto = {
        customer: 'John Doe',
        amount: 100,
        reference: 'REF123',
        items: [{ sku: 'SKU123', qt: 2 }],
      };
      jest
        .spyOn(service, 'create')
        .mockRejectedValue(new Error('Error creating invoice'));

      try {
        await controller.createInvoice(createInvoiceDto);
      } catch (error) {
        expect(error.message).toBe('Error creating invoice');
      }
    });
  });

  describe('get user by id', () => {
    it('should return an invoice by id', async () => {
      const invoice = {
        customer: 'John Doe',
        amount: 100,
        reference: 'REF123',
        items: [{ sku: 'SKU123', qt: 2 }],
        id: 'invoiceId',
      };
      jest.spyOn(service, 'findById').mockResolvedValue(invoice as Invoice);

      expect(await controller.getInvoiceById('invoiceId')).toBe(invoice);
    });

    it('should not return an invoice by id', async () => {
      jest.spyOn(service, 'findById').mockResolvedValue(null as Invoice);

      try {
        await controller.getInvoiceById('invalidId');
      } catch (error) {
        expect(error.message).toBe('Invoice not found');
      }
    });
  });
});
