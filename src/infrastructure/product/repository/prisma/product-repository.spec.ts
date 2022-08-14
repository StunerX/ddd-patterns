import { Prisma } from '@prisma/client';
import { Product } from '@src/domain/product/entity/product';
import { prismaMock } from '@src/infrastructure/db/prisma/singleton';

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

  test('should find product by id', async () => {
    const productRepository = new ProductRepository();

    const productMock = new Product('#1', 'product one', 125);

    prismaMock.product.findFirst.mockResolvedValue({
      id: '#1',
      name: 'product one',
      price: new Prisma.Decimal(125)
    });

    const product = await productRepository.find('#1');

    expect(product).toStrictEqual(productMock);
  });

  test('should find all products', async () => {
    const productRepository = new ProductRepository();

    prismaMock.product.findMany.mockResolvedValue([
      {
        id: '#1',
        name: 'product one',
        price: new Prisma.Decimal(125)
      },
      {
        id: '#2',
        name: 'product two',
        price: new Prisma.Decimal(220)
      }
    ]);

    const products = await productRepository.findAll();

    const productOne = new Product('#1', 'product one', 125);
    const productTwo = new Product('#2', 'product two', 220);

    expect(products?.length).toBe(2);
    expect(products).toContainEqual(productOne);
    expect(products).toContainEqual(productTwo);
  });
});
