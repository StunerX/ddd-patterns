import { Product } from './product';

describe('Product unit test', () => {
  test('should throw error when id is empty', () => {
    expect(() => {
      new Product('', 'product 1', 100);
    }).toThrowError('Id is required');
  });

  test('should throw error when name is empty', () => {
    expect(() => {
      new Product('1', '', 100);
    }).toThrowError('Name is required');
  });

  test('should throw error when price lower than or equal zero', () => {
    expect(() => {
      new Product('1', 'product 1', -10);
    }).toThrowError('Price is required');
  });

  test('should change product name', () => {
    const product = new Product('1', 'product 1', 100);
    product.changeName('product one');

    expect(product.getName()).toBe('product one');
  });

  test('should change product price', () => {
    const product = new Product('1', 'product 1', 100);
    product.changePrice(25);

    expect(product.getPrice()).toBe(25);
  });
});
