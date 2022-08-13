import { Product } from '@src/domain/entity/product';
import { ProductRepositoryInterface } from '@src/domain/repository/product-repository-interface';
import prisma from '../db/prisma/client';

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<{ createdId: string }> {
    const product = await prisma.product.create({
      data: {
        id: entity.getId(),
        name: entity.getName(),
        price: entity.getPrice()
      }
    });

    return {
      createdId: product.id
    };
  }
  async find(id: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: { id }
    });

    if (!product?.id) return null;

    return new Product(product.id, product.name, product.price.toNumber());
  }
  async findAll(): Promise<Product[] | null> {
    const products = await prisma.product.findMany({});

    return products.map((p) => new Product(p.id, p.name, p.price.toNumber()));
  }
  async update(entity: Product): Promise<{ id: string }> {
    const product = await prisma.product.update({
      where: { id: entity.getId() },
      data: {
        id: entity.getId(),
        name: entity.getName(),
        price: entity.getPrice()
      }
    });

    return {
      id: product.id
    };
  }
}
