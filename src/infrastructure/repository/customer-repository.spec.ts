import { Customer } from '@src/domain/entity/customer';
import { prismaMock } from '../db/prisma/singleton';
import { CustomerRepository } from './customer-repository';

describe('Customer Repository Test', () => {
  test('should create a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('#1', 'customer 1');
    customer.changeAddress('street 1', 222, '13222-221', 'Curitiba');

    prismaMock.customer.create.mockResolvedValue({
      id: '#1',
      name: 'customer 1',
      street: 'street 1',
      number: 222,
      zipCode: '13222-221',
      city: 'Curitiba',
      active: true,
      rewardPoints: 0
    });

    const output = await customerRepository.create(customer);

    expect(output).toEqual({
      createdId: '#1'
    });
  });

  test('should update a customer', async () => {
    const customerRepository = new CustomerRepository();

    const customer = new Customer('#1', 'customer edited');
    customer.changeAddress('street edited', 333, '12345-111', 'São Paulo');

    prismaMock.customer.update.mockResolvedValue({
      id: '#1',
      name: 'customer edited',
      street: 'street edited',
      number: 222,
      zipCode: '2345-111',
      city: 'São Paulo',
      active: true,
      rewardPoints: 0
    });

    const output = await customerRepository.update(customer);

    expect(output).toEqual({
      id: '#1'
    });
  });

  test('should find customer by id', async () => {
    const customerRepository = new CustomerRepository();

    prismaMock.customer.findFirst.mockResolvedValue({
      id: '#1',
      name: 'customer 1',
      street: 'street 1',
      number: 222,
      zipCode: '13222-221',
      city: 'Curitiba',
      active: true,
      rewardPoints: 0
    });

    const productMock = new Customer('#1', 'customer 1');
    productMock.changeAddress('street 1', 222, '13222-221', 'Curitiba');
    productMock.activate();

    const product = await customerRepository.find('#1');

    expect(product).toEqual(productMock);
  });

  test('should find all customers', async () => {
    const customerRepository = new CustomerRepository();

    prismaMock.customer.findMany.mockResolvedValue([
      {
        id: '#1',
        name: 'customer 1',
        street: 'street 1',
        number: 222,
        zipCode: '13222-221',
        city: 'Curitiba',
        active: true,
        rewardPoints: 0
      },
      {
        id: '#2',
        name: 'customer 2',
        street: 'street 2',
        number: 333,
        zipCode: '13222-221',
        city: 'São Paulo',
        active: true,
        rewardPoints: 0
      }
    ]);

    const customers = await customerRepository.findAll();

    const customerOne = new Customer('#1', 'customer 1');
    customerOne.changeAddress('street 1', 222, '13222-221', 'Curitiba');

    const customerTwo = new Customer('#2', 'customer 2');
    customerTwo.changeAddress('street 2', 333, '13222-221', 'São Paulo');

    expect(customers?.length).toBe(2);
    expect(customers).toContainEqual(customerOne);
    expect(customers).toContainEqual(customerTwo);
  });
});
