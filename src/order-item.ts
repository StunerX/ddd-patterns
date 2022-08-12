export class OrderItem {
  constructor(private readonly id: string, private readonly price: number) {}

  public getPrice(): number {
    return this.price;
  }
}
