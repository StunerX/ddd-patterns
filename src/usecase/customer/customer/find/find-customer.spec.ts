import { Customer } from '@src/domain/customer/entity/customer';
import { CustomerRepository } from '@src/infrastructure/customer/repository/prisma/customer-repository';
import { FindCustomerUseCase } from './find-customer';

describe('Test find customer use case', () => {
  test('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    jest.spyOn(customerRepository, 'find').mockImplementationOnce(async () => {
      const customer = new Customer('#1', 'customer 1');
      customer.changeAddress('street 1', 222, '13222-221', 'Curitiba');
      return customer;
    });

    const input = {
      id: '#1'
    };

    const output = {
      id: '#1',
      name: 'customer 1',
      address: {
        street: 'street 1',
        number: 222,
        zipCode: '13222-221',
        city: 'Curitiba'
      }
    };

    const result = await findCustomerUseCase.execute(input);

    expect(result).toStrictEqual(output);
  });
});
