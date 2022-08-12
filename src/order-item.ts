export class OrderItem {
  constructor(
    private readonly id: string,
    private name: string,
    private price: number,
    private productId: string,
    private quantity: number
  ) {}

  public getPrice(): number {
    return this.price * this.quantity;
  }
}
