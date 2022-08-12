import { Order } from './order';
import { OrderItem } from './order-item';

describe('Order unit test', () => {
  test('should throw error when id is empty', () => {
    const items = [new OrderItem('1', 1)];
    expect(() => {
      new Order('', '1', items);
    }).toThrowError('Id is required');
  });

  test('should throw error when customer id is empty', () => {
    const items = [new OrderItem('1', 1)];
    expect(() => {
      new Order('1', '', items);
    }).toThrowError('CustomerId is required');
  });

  test('should throw error when items is empty', () => {
    expect(() => {
      new Order('1', '1', []);
    }).toThrowError('Items is required');
  });
});
