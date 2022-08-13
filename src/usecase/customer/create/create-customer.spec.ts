/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from '@src/domain/customer/entity/customer';
import { CustomerRepositoryInterface } from '@src/domain/customer/repository/customer-repository-interface';
import { CreateCustomerUseCase } from './create-customer';

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
  const createCustomerUseCase = new CreateCustomerUseCase(customerRepositoryStub);

  return {
    customerRepositoryStub,
    createCustomerUseCase
  };
};

describe('Test create customer use case', () => {
  test('should create a customer', async () => {
    const { customerRepositoryStub, createCustomerUseCase } = makeSut();

    jest.spyOn(customerRepositoryStub, 'create').mockImplementationOnce(async () => {
      return { createdId: 'any_id' };
    });

    const input = {
      name: 'customer 1',
      address: {
        street: 'street 1',
        number: 222,
        zipCode: '13222-221',
        city: 'Curitiba'
      }
    };

    const output = {
      id: 'any_id'
    };

    const result = await createCustomerUseCase.execute(input);

    expect(result).toStrictEqual(output);
  });

  test('should throws if validate throws', () => {
    const { createCustomerUseCase } = makeSut();

    const input = {
      name: '',
      address: {
        street: 'street 1',
        number: 222,
        zipCode: '13222-221',
        city: 'Curitiba'
      }
    };

    const result = createCustomerUseCase.execute(input);

    expect(result).rejects.toThrowError();
  });
});
