/* eslint-disable @typescript-eslint/no-unused-vars */

import { Product } from '@src/domain/product/entity/product';
import { ProductRepositoryInterface } from '@src/domain/product/repository/product-repository-interface';
import { ListProductUseCase } from './list-product';

const makeSut = () => {
  class ProductRepositoryStub implements ProductRepositoryInterface {
    create(entity: Product): Promise<{ createdId: string }> {
      throw new Error('Method not implemented.');
    }
    find(id: string): Promise<Product | null> {
      throw new Error('Method not implemented.');
    }
    findAll(): Promise<Product[] | null> {
      throw new Error('Method not implemented.');
    }
    update(entity: Product): Promise<{ id: string }> {
      throw new Error('Method not implemented.');
    }
  }

  const productRepositoryStub = new ProductRepositoryStub();
  const listProductUseCase = new ListProductUseCase(productRepositoryStub);

  return {
    productRepositoryStub,
    listProductUseCase
  };
};

describe('Test list product use case', () => {
  test('should list all products', async () => {
    const { listProductUseCase, productRepositoryStub } = makeSut();

    jest.spyOn(productRepositoryStub, 'findAll').mockImplementationOnce(async () => {
      const productOne = new Product('#1', 'product 1', 10);
      const productTwo = new Product('#2', 'product 2', 20);

      return [productOne, productTwo];
    });

    const output = {
      products: [
        {
          id: '#1',
          name: 'product 1',
          price: 10
        },
        {
          id: '#2',
          name: 'product 2',
          price: 20
        }
      ]
    };

    const result = await listProductUseCase.execute();

    expect(result).toStrictEqual(output);
  });

  test('should throws if product repository throws', () => {
    const { productRepositoryStub, listProductUseCase } = makeSut();

    jest.spyOn(productRepositoryStub, 'findAll').mockImplementationOnce(() => {
      throw new Error('Product not found');
    });

    const result = listProductUseCase.execute();

    expect(result).rejects.toThrowError();
  });
});
