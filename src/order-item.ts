export class OrderItem {
  constructor(private readonly id: string, private name: string, private price: number) {}

  public getPrice(): number {
    return this.price;
  }
}
