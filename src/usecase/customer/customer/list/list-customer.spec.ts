/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from '@src/domain/customer/entity/customer';
import { CustomerRepositoryInterface } from '@src/domain/customer/repository/customer-repository-interface';
import { ListCustomerUseCase } from './list-customer';

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
  const listCustomerUseCase = new ListCustomerUseCase(customerRepositoryStub);

  return {
    customerRepositoryStub,
    listCustomerUseCase
  };
};

describe('Test find customer use case', () => {
  test('should find a customer', async () => {
    const { customerRepositoryStub, listCustomerUseCase } = makeSut();

    jest.spyOn(customerRepositoryStub, 'findAll').mockImplementationOnce(async () => {
      const customerOne = new Customer('#1', 'customer 1');
      customerOne.changeAddress('street 1', 222, '13222-221', 'Curitiba');

      const customerTwo = new Customer('#2', 'customer 2');
      customerTwo.changeAddress('street 2', 333, '13222-222', 'Curitiba 2');
      return [customerOne, customerTwo];
    });

    const output = {
      customers: [
        {
          id: '#1',
          name: 'customer 1',
          address: {
            street: 'street 1',
            number: 222,
            zipCode: '13222-221',
            city: 'Curitiba'
          }
        },
        {
          id: '#2',
          name: 'customer 2',
          address: {
            street: 'street 2',
            number: 333,
            zipCode: '13222-222',
            city: 'Curitiba 2'
          }
        }
      ]
    };

    const result = await listCustomerUseCase.execute();

    expect(result).toStrictEqual(output);
  });

  test('should throws if customer repository throws', () => {
    const { customerRepositoryStub, listCustomerUseCase } = makeSut();

    jest.spyOn(customerRepositoryStub, 'findAll').mockImplementationOnce(() => {
      throw new Error('Customer not found');
    });

    const result = listCustomerUseCase.execute();

    expect(result).rejects.toThrowError();
  });
});
