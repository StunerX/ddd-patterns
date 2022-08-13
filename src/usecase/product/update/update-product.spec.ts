/* eslint-disable @typescript-eslint/no-unused-vars */

import { Product } from '@src/domain/product/entity/product';
import { ProductRepositoryInterface } from '@src/domain/product/repository/product-repository-interface';
import { UpdateProductUseCase } from './update-product';

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
  const updateProductUseCase = new UpdateProductUseCase(productRepositoryStub);

  return {
    productRepositoryStub,
    updateProductUseCase
  };
};

describe('Test create customer use case', () => {
  test('should create a customer', async () => {
    const { productRepositoryStub, updateProductUseCase } = makeSut();

    jest.spyOn(productRepositoryStub, 'update').mockImplementationOnce(async () => {
      return { id: 'any_id' };
    });

    const input = {
      id: 'any_id',
      name: 'product 1',
      price: 10
    };

    const output = {
      id: 'any_id'
    };

    const result = await updateProductUseCase.execute(input);

    expect(result).toStrictEqual(output);
  });

  test('should throws if validate throws', () => {
    const { updateProductUseCase } = makeSut();

    const input = {
      id: 'any_id',
      name: 'product 1',
      price: 10
    };

    const result = updateProductUseCase.execute(input);

    expect(result).rejects.toThrowError();
  });
});
