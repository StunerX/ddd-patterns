import { Product } from '@src/domain/entity/product';
import { prismaMock } from '../db/prisma/singleton';
import { ProductRepository } from './product-repository';

describe('Product Repository Test', () => {
  test('should create a product', async () => {
    const productRepository = new ProductRepository();

    const product = new Product('#1', 'product 1', 100);

    prismaMock.product.create.mockResolvedValue({
      id: '#1',
      name: 'product 1',
      price: '100'
    });

    const output = await productRepository.create(product);

    expect(output).toEqual({
      createdId: '#1'
    });
  });
});
