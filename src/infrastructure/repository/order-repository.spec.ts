import { prisma, Prisma } from '@prisma/client';
import { Order } from '@src/domain/entity/order';
import { OrderItem } from '@src/domain/entity/order-item';
import { prismaMock } from '../db/prisma/singleton';
import { OrderRepository } from './order-repository';

describe('Customer Repository Test', () => {
  test('should create an order', async () => {
    const orderRepository = new OrderRepository();

    const item1 = new OrderItem('#1', 'item 1', 10, '#1', 2);
    const item2 = new OrderItem('#2', 'item 2', 4, '#2', 2);
    const items = [item1, item2];

    const order = new Order('#1', '#1', items);

    prismaMock.order.create.mockResolvedValue({
      id: '#1',
      customerId: '#1',
      total: new Prisma.Decimal(28)
    });

    const output = await orderRepository.create(order);

    expect(output).toEqual({
      createdId: '#1'
    });
  });

  test('should find an order', async () => {
    const orderRepository = new OrderRepository();

    const item1 = new OrderItem('#1', 'item 1', 10, '#1', 2);
    const item2 = new OrderItem('#2', 'item 2', 4, '#2', 2);
    const items = [item1, item2];

    const order = new Order('#1', '#1', items);

    const mockOrder = {
      id: '#1',
      customerId: '#1',
      OrderItem: [
        {
          id: '#1',
          name: 'item 1',
          price: new Prisma.Decimal(10),
          productId: '#1',
          quantity: 2
        },
        {
          id: '#2',
          name: 'item 2',
          price: new Prisma.Decimal(4),
          productId: '#2',
          quantity: 2
        }
      ],
      total: new Prisma.Decimal(12)
    };

    prismaMock.order.findFirst.mockResolvedValue(mockOrder);

    const output = await orderRepository.find('#1');

    expect(output).toStrictEqual(order);
  });

  test('should find all', async () => {
    const orderRepository = new OrderRepository();

    const item1 = new OrderItem('#1', 'item 1', 10, '#1', 2);
    const item2 = new OrderItem('#2', 'item 2', 4, '#2', 2);
    const items = [item1, item2];

    const order = new Order('#1', '#1', items);

    const mockOrder = [
      {
        id: '#1',
        customerId: '#1',
        OrderItem: [
          {
            id: '#1',
            name: 'item 1',
            price: new Prisma.Decimal(10),
            productId: '#1',
            quantity: 2
          },
          {
            id: '#2',
            name: 'item 2',
            price: new Prisma.Decimal(4),
            productId: '#2',
            quantity: 2
          }
        ],
        total: new Prisma.Decimal(12)
      }
    ];

    prismaMock.order.findMany.mockResolvedValue(mockOrder);

    const output = await orderRepository.findAll();

    expect(output).toStrictEqual([order]);
  });

  test('should update an order', async () => {
    const orderRepository = new OrderRepository();

    const item1 = new OrderItem('#1', 'item one', 10, '#1', 5);
    const item2 = new OrderItem('#2', 'item two', 4, '#2', 6);
    const items = [item1, item2];

    const order = new Order('#1', '#1', items);

    prismaMock.order.update.mockResolvedValue({
      id: '#1',
      customerId: '#1',
      total: new Prisma.Decimal(74)
    });

    const output = await orderRepository.update(order);

    expect(output).toEqual({
      id: '#1'
    });
  });
});
