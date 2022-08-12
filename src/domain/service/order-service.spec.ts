import { Customer } from '../entity/customer';
import { Order } from '../entity/order';
import { OrderItem } from '../entity/order-item';
import { OrderService } from './order-service';

describe('Order service unit tests', () => {
  test('should place na order', () => {
    const customer = new Customer('customer_1', 'Customer 1');
    const item1 = new OrderItem('item_1', 'item 1', 10, 'product_1', 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  test('should calculate total of all orders', () => {
    const item1 = new OrderItem('item_1', 'item 1', 100, 'product_1', 1);
    const item2 = new OrderItem('item_2', 'item 2', 100, 'product_2', 3);

    const order1 = new Order('order_1', 'customer_1', [item1]);
    const order2 = new Order('order_2', 'customer_2', [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(400);
  });
});
