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

  public getId(): string {
    return this._id;
  }

  public getCustomerId(): string {
    return this._customerId;
  }

  public getItems(): OrderItem[] {
    return this._items;
  }

  private validate() {
    if (!this._id) throw new Error('Id is required');
    if (!this._customerId) throw new Error('CustomerId is required');
    if (this._items.length === 0) throw new Error('Items is required');
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.getPrice(), 0);
  }
}
