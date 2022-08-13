import { Customer } from '@src/domain/customer/entity/customer';
import { v4 as uuid } from 'uuid';
import { Order } from '../entity/order';
import { OrderItem } from '../entity/order-item';

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
