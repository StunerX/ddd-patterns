import { Customer } from './customer';

describe('Customer unit test', () => {
  test('should throw error when id is empty', () => {
    expect(() => {
      new Customer('', 'John');
    }).toThrowError('Id is required');
  });
});
