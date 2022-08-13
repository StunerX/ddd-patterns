import { Order } from '@src/domain/entity/order';
import { OrderItem } from '@src/domain/entity/order-item';
import { OrderRepositoryInterface } from '@src/domain/repository/order-repository-interface';
import prisma from '../db/prisma/client';

export class OrderRepository implements OrderRepositoryInterface {
  async find(id: string): Promise<Order | null> {
    const order = await prisma.order.findFirst({
      where: { id },
      include: {
        OrderItem: {
          orderBy: { id: 'asc' }
        }
      }
    });

    if (!order?.OrderItem) throw new Error('cannot return order with no items');

    const items = order.OrderItem.map((x) => new OrderItem(x.id, x.name, x.price.toNumber(), x.productId, x.quantity));
    const result = new Order(order.id, order.customerId, items);

    return result;
  }
  async findAll(): Promise<Order[] | null> {
    const orders = await prisma.order.findMany({
      include: {
        OrderItem: {
          orderBy: { id: 'asc' }
        }
      }
    });

    return orders.map((order) => {
      const items = order.OrderItem.map(
        (item) => new OrderItem(item.id, item.name, item.price.toNumber(), item.productId, item.quantity)
      );
      return new Order(order.id, order.customerId, items);
    });
  }
  async update(entity: Order): Promise<{ id: string }> {
    const result = await prisma.order.update({
      where: { id: entity.getId() },
      data: {
        customerId: entity.getCustomerId(),
        total: entity.total(),
        OrderItem: {
          createMany: {
            data: entity.getItems().map((item) => {
              return {
                name: item.getName(),
                price: item.getPrice(),
                quantity: item.getQuantity(),
                productId: item.getProductId()
              };
            })
          }
        }
      }
    });

    return {
      id: result.id
    };
  }
  async create(entity: Order): Promise<{ createdId: string }> {
    const order = await prisma.order.create({
      data: {
        customerId: entity.getCustomerId(),
        total: entity.total(),
        OrderItem: {
          createMany: {
            data: entity.getItems().map((item) => {
              return {
                name: item.getName(),
                price: item.getPrice(),
                quantity: item.getQuantity(),
                productId: item.getProductId()
              };
            })
          }
        }
      }
    });

    return {
      createdId: order.id
    };
  }
}
