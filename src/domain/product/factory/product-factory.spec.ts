import { ProductFactory } from './product-factory';

describe('Product factory unit test', () => {
  test('should create a product', () => {
    const product = ProductFactory.new('product 1', 1);
    expect(product.getId()).toBeDefined();
    expect(product.getName()).toBe('product 1');
    expect(product.getPrice()).toBe(1);
  });
});
