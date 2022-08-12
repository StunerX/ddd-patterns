import { Product } from '@src/domain/entity/product';
import { ProductRepositoryInterface } from '@src/domain/repository/product-repository-interface';
import prisma from '../db/prisma/client';

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<{ createdId: string }> {
    const product = await prisma.product.create({
      data: entity
    });

    return {
      createdId: product.id
    };
  }
  find(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  findAll(): Promise<Product[]> {
    throw new Error('Method not implemented.');
  }
  update(entity: Product): Promise<{ createdId: string }> {
    throw new Error('Method not implemented.');
  }
}
