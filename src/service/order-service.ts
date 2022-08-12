import { Customer } from '@src/entity/customer';
import { Order } from '@src/entity/order';
import { OrderItem } from '@src/entity/order-item';
import { v4 as uuid } from 'uuid';

export class OrderService {
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) throw new Error('Order must have at least one order item');

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoint(order.total() / 2);

    return order;
  }

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => acc + order.total(), 0);
  }
}
