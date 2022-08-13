/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '@src/domain/product/entity/product';
import { ProductRepositoryInterface } from '@src/domain/product/repository/product-repository-interface';
import { FindProductUseCase } from './find-product';

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
  const findProductUseCase = new FindProductUseCase(productRepositoryStub);

  return {
    productRepositoryStub,
    findProductUseCase
  };
};

describe('Test find product use case', () => {
  test('should find a product', async () => {
    const { productRepositoryStub, findProductUseCase } = makeSut();

    jest.spyOn(productRepositoryStub, 'find').mockImplementationOnce(async () => {
      const product = new Product('any_id', 'product 1', 10);

      return new Promise((resolve) => resolve(product));
    });

    const input = {
      id: 'any_id'
    };

    const output = {
      id: 'any_id',
      name: 'product 1',
      price: 10
    };

    const result = await findProductUseCase.execute(input);

    expect(result).toStrictEqual(output);
  });

  test('should throws if product repository throws', () => {
    const { productRepositoryStub, findProductUseCase } = makeSut();

    jest.spyOn(productRepositoryStub, 'find').mockImplementationOnce(() => {
      throw new Error('Product not found');
    });

    const input = {
      id: 'any_id'
    };

    const result = findProductUseCase.execute(input);

    expect(result).rejects.toThrowError();
  });
});
