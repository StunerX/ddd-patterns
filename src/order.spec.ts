import { Order } from './order';
import { OrderItem } from './order-item';

describe('Order unit test', () => {
  test('should throw error when id is empty', () => {
    const items = [new OrderItem('1', 1)];
    expect(() => {
      new Order('', 'John', items);
    }).toThrowError('Id is required');
  });
});
