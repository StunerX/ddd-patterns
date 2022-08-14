import { prismaMock } from '@src/infrastructure/db/prisma/singleton';
import request from 'supertest';
import { app } from '../express';

describe('E2E test for customer', () => {
  test('should create a customer', async () => {
    prismaMock.customer.create.mockResolvedValue({
      id: 'any_id',
      name: 'customer 1',
      street: 'street 1',
      number: 222,
      zipCode: '13222-221',
      city: 'Curitiba',
      active: true,
      rewardPoints: 0
    });

    const response = await request(app)
      .post('/customer')
      .send({
        name: 'any_name',
        address: {
          street: 'any_street',
          number: 1,
          zipCode: 'any_zipCode',
          city: 'any_city'
        }
      });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      id: 'any_id'
    });
  });

  test('should return 500 if customer is invalid', async () => {
    prismaMock.customer.create.mockResolvedValue({
      id: 'any_id',
      name: 'any_name',
      street: 'any_street',
      number: 1,
      zipCode: 'any_zipCode',
      city: 'any_city',
      active: true,
      rewardPoints: 0
    });

    const response = await request(app)
      .post('/customer')
      .send({
        name: '',
        address: {
          street: 'any_street',
          number: 1,
          zipCode: 'any_zipCode',
          city: 'any_city'
        }
      });

    expect(response.status).toBe(500);
  });

  test('should return all customers', async () => {
    prismaMock.customer.findMany.mockResolvedValue([
      {
        id: '#1',
        name: 'customer 1',
        street: 'street 1',
        number: 222,
        zipCode: '13222-221',
        city: 'Curitiba',
        active: true,
        rewardPoints: 0
      },
      {
        id: '#2',
        name: 'customer 2',
        street: 'street 2',
        number: 333,
        zipCode: '13222-221',
        city: 'São Paulo',
        active: true,
        rewardPoints: 0
      }
    ]);

    const response = await request(app).get('/customer').send();

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      customers: [
        {
          address: { city: 'Curitiba', number: 222, street: 'street 1', zipCode: '13222-221' },
          id: '#1',
          name: 'customer 1'
        },
        {
          address: { city: 'São Paulo', number: 333, street: 'street 2', zipCode: '13222-221' },
          id: '#2',
          name: 'customer 2'
        }
      ]
    });
  });
});
