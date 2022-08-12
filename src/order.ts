import { OrderItem } from './order-item';

export class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[];

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;

    this.validate();
  }

  private validate() {
    if (!this._id) throw new Error('Id is required');
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.getPrice(), 0);
  }
}
