/* eslint-disable @typescript-eslint/no-unused-vars */

import { Product } from '@src/domain/product/entity/product';
import { ProductRepositoryInterface } from '@src/domain/product/repository/product-repository-interface';
import { CreateProductUseCase } from './create-product';

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
  const createProductUseCase = new CreateProductUseCase(productRepositoryStub);

  return {
    productRepositoryStub,
    createProductUseCase
  };
};

describe('Test create customer use case', () => {
  test('should create a customer', async () => {
    const { productRepositoryStub, createProductUseCase } = makeSut();

    jest.spyOn(productRepositoryStub, 'create').mockImplementationOnce(async () => {
      return { createdId: 'any_id' };
    });

    const input = {
      name: 'customer 1',
      price: 10
    };

    const output = {
      id: 'any_id'
    };

    const result = await createProductUseCase.execute(input);

    expect(result).toStrictEqual(output);
  });

  test('should throws if validate throws', () => {
    const { createProductUseCase } = makeSut();

    const input = {
      name: 'customer 1',
      price: 10
    };

    const result = createProductUseCase.execute(input);

    expect(result).rejects.toThrowError();
  });
});
