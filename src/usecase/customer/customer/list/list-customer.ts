import { CustomerRepository } from '@src/infrastructure/customer/repository/prisma/customer-repository';
import { OutputListCustomerDto } from './list-customer-dto';

export class ListCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async execute(): Promise<OutputListCustomerDto | null> {
    const customersResult = await this.customerRepository.findAll();

    if (!customersResult || customersResult.length === 0) return null;

    const customers = customersResult.map((customer) => {
      return {
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.getStreet(),
          number: customer.address.getNumber(),
          zipCode: customer.address.getZipCode(),
          city: customer.address.getCity()
        }
      };
    });

    return {
      customers
    };
  }
}
