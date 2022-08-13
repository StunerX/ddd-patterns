import { CustomerRepository } from '@src/infrastructure/customer/repository/prisma/customer-repository';
import { InputFindCustomerDto, OutputFindCustomerDto } from './find-customer-dto';

export class FindCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id);

    if (!customer) throw new Error('Customer not found');

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
  }
}
