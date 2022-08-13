import { Prisma } from '@prisma/client';
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
      price: new Prisma.Decimal(100)
    });

    const output = await productRepository.create(product);

    expect(output).toEqual({
      createdId: '#1'
    });
  });

  test('should update a product', async () => {
    const productRepository = new ProductRepository();

    const product = new Product('#1', 'product 1', 100);

    product.changeName('product one');
    product.changePrice(125);

    prismaMock.product.update.mockResolvedValue({
      id: '#1',
      name: 'product one',
      price: new Prisma.Decimal(125)
    });

    const { id } = await productRepository.update(product);

    expect(id).toEqual('#1');

    prismaMock.product.findFirst.mockResolvedValue({
      id: '#1',
      name: 'product one',
      price: new Prisma.Decimal(125)
    });

    const editedProduct = await productRepository.find(id);
    expect(editedProduct).toStrictEqual(product);
  });
});
