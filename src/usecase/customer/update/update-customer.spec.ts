/* eslint-disable @typescript-eslint/no-unused-vars */
import { Customer } from '@src/domain/customer/entity/customer';
import { CustomerRepositoryInterface } from '@src/domain/customer/repository/customer-repository-interface';
import { UpdateCustomerUseCase } from './update-customer';

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
  const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepositoryStub);

  return {
    customerRepositoryStub,
    updateCustomerUseCase
  };
};

describe('Test update customer use case', () => {
  test('should update a customer', async () => {
    const { customerRepositoryStub, updateCustomerUseCase } = makeSut();

    jest.spyOn(customerRepositoryStub, 'update').mockImplementationOnce(async () => {
      return { id: 'any_id' };
    });

    const input = {
      id: 'any_id',
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

    const result = await updateCustomerUseCase.execute(input);

    expect(result).toStrictEqual(output);
  });

  test('should throws if validate throws', () => {
    const { updateCustomerUseCase } = makeSut();

    const input = {
      id: 'any_id',
      name: '',
      address: {
        street: 'street 1',
        number: 222,
        zipCode: '13222-221',
        city: 'Curitiba'
      }
    };

    const result = updateCustomerUseCase.execute(input);

    expect(result).rejects.toThrowError();
  });
});
