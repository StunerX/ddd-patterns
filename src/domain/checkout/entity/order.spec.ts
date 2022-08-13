import { Order } from './order';
import { OrderItem } from './order-item';

describe('Order unit test', () => {
  test('should throw error when id is empty', () => {
    const items = [new OrderItem('1', 'item 1', 1, 'product_1', 2)];
    expect(() => {
      new Order('', '1', items);
    }).toThrowError('Id is required');
  });

  test('should throw error when customer id is empty', () => {
    const items = [new OrderItem('1', 'item 1', 1, 'product_1', 2)];
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
    const item1 = new OrderItem('1', 'item 1', 100, 'product_1', 10);
    const item2 = new OrderItem('2', 'item 2', 150, 'product_2', 3);
    const order = new Order('1', '1', [item1, item2]);

    expect(order.total()).toBe(1450);
  });

  test('should throw error if quantity lower than or equal zero', () => {
    expect(() => {
      const items = [new OrderItem('1', 'item 1', 1, 'product_1', 0)];

      new Order('1', '', items);
    }).toThrowError('Quantity must be greater than zero');
  });
});
