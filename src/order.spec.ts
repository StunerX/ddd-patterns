import { Order } from './order';
import { OrderItem } from './order-item';

describe('Order unit test', () => {
  test('should throw error when id is empty', () => {
    const items = [new OrderItem('1', 'item 1', 1)];
    expect(() => {
      new Order('', '1', items);
    }).toThrowError('Id is required');
  });

  test('should throw error when customer id is empty', () => {
    const items = [new OrderItem('1', 'item 1', 1)];
    expect(() => {
      new Order('1', '', items);
    }).toThrowError('CustomerId is required');
  });

  test('should throw error when items is empty', () => {
    expect(() => {
      new Order('1', '1', []);
    }).toThrowError('Items is required');
  });

  test('should calculate total', () => {
    const item1 = new OrderItem('1', 'item 1', 100);
    const item2 = new OrderItem('2', 'item 2', 150);
    const order = new Order('1', '1', [item1, item2]);

    expect(order.total()).toBe(250);
  });
});
