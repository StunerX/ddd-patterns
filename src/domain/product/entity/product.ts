import { ProductInterface } from './product-interface';

export class Product implements ProductInterface {
  constructor(private readonly id: string, private name: string, private price: number) {
    this.validate();
  }

  private validate() {
    if (!this.id) throw new Error('Id is required');
    if (!this.name) throw new Error('Name is required');
    if (this.price <= 0) throw new Error('Price is required');
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public changeName(name: string): void {
    this.name = name;
  }

  public changePrice(price: number): void {
    this.price = price;
  }
}
