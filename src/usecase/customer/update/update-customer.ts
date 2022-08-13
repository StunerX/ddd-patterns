import { Customer } from '@src/domain/customer/entity/customer';
import { CustomerRepository } from '@src/infrastructure/customer/repository/prisma/customer-repository';
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update-customer-dto';

export class UpdateCustomerUseCase {
  constructor(private readonly customerRepository: CustomerRepository) {}
  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const { street, number, zipCode, city } = input.address;
    const customer = new Customer(input.id, input.name);
    customer.changeAddress(street, number, zipCode, city);

    const result = await this.customerRepository.update(customer);

    return {
      id: result.id
    };
  }
}
