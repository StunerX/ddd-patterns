import { CustomerFactory } from '@src/domain/customer/factory/customer-factory';
import { CustomerRepository } from '@src/infrastructure/customer/repository/prisma/customer-repository';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create-customer-dto';

export class CreateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const { street, number, zipCode, city } = input.address;

    const customer = CustomerFactory.createWithAddress(input.name, street, number, zipCode, city);

    const result = await this.customerRepository.create(customer);

    return {
      id: result.createdId
    };
  }
}
