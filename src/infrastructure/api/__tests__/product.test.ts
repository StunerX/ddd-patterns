import { Prisma } from '@prisma/client';
import { prismaMock } from '@src/infrastructure/db/prisma/singleton';
import request from 'supertest';
import { app } from '../express';

describe('E2E Test for product', () => {
  test('should create a product', async () => {
    prismaMock.product.create.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      price: new Prisma.Decimal(1)
    });

    const response = await request(app).post('/product').send({
      name: 'any_name',
      price: 1
    });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: 'any_id'
    });
  });

  test('should return 500 if product is invalid', async () => {
    prismaMock.product.create.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      price: new Prisma.Decimal(1)
    });

    const response = await request(app).post('/product').send({
      name: '',
      price: 1
    });

    expect(response.status).toBe(500);
  });

  test('should return all products', async () => {
    prismaMock.product.findMany.mockResolvedValue([
      {
        id: '#1',
        name: 'any_name#1',
        price: new Prisma.Decimal(1)
      },
      {
        id: '#2',
        name: 'any_name#2',
        price: new Prisma.Decimal(2)
      }
    ]);

    const response = await request(app).get('/product').send();

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      products: [
        {
          id: '#1',
          name: 'any_name#1',
          price: 1
        },
        {
          id: '#2',
          name: 'any_name#2',
          price: 2
        }
      ]
    });
  });
});
