import { Customer } from './customer';

describe('Customer unit test', () => {
  test('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'John');
    }).toThrowError('Id is required');
  });

  test('should throw error when name is empty', () => {
    expect(() => {
      new Customer('1', '');
    }).toThrowError('Name is required');
  });

  test('should change name', () => {
    const name = 'Jane';

    const customer = new Customer('1', 'Bane');

    customer.changeName(name);

    expect(customer.name).toBe(name);
  });

  test('should activate customer', () => {
    const customer = new Customer('1', 'Jane');
    customer.changeAddress('Street 1', 123, '80020-999', 'São Paulo');

    customer.activate();

    expect(customer.active).toBe(true);
  });

  test('should deactivate customer', () => {
    const customer = new Customer('1', 'Jane');

    customer.deactivate();

    expect(customer.active).toBe(false);
  });
});
