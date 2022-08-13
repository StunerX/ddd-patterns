/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from '@src/domain/customer/entity/customer';
import { CustomerRepositoryInterface } from '@src/domain/customer/repository/customer-repository-interface';
import { CustomerRepository } from '@src/infrastructure/customer/repository/prisma/customer-repository';
import { FindCustomerUseCase } from './find-customer';

const makeSut = () => {
  class CustomerRepositoryStub implements CustomerRepositoryInterface {
    create(entity: Customer): Promise<{ createdId: string }> {
      throw new Error('Method not implemented.');
    }
    find(id: string): Promise<Customer | null> {
      throw new Error('Method not implemented.');
    }
    findAll(): Promise<Customer[] | null> {
      throw new Error('Method not implemented.');
    }
    update(entity: Customer): Promise<{ id: string }> {
      throw new Error('Method not implemented.');
    }
  }

  const customerRepositoryStub = new CustomerRepositoryStub();
  const findCustomerUseCase = new FindCustomerUseCase(customerRepositoryStub);

  return {
    customerRepositoryStub,
    findCustomerUseCase
  };
};

describe('Test find customer use case', () => {
  test('should find a customer', async () => {
    const { customerRepositoryStub, findCustomerUseCase } = makeSut();

    jest.spyOn(customerRepositoryStub, 'find').mockImplementationOnce(async () => {
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

  test('should throws if customer repository throws', () => {
    const { customerRepositoryStub, findCustomerUseCase } = makeSut();

    jest.spyOn(customerRepositoryStub, 'find').mockImplementationOnce(() => {
      throw new Error('Customer not found');
    });

    const input = {
      id: '#1'
    };

    const result = findCustomerUseCase.execute(input);

    expect(result).rejects.toThrowError();
  });
});
