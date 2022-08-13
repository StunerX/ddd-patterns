export class OrderItem {
  constructor(
    private readonly id: string,
    private name: string,
    private price: number,
    private productId: string,
    private quantity: number
  ) {
    this.validate();
  }

  public getName(): string {
    return this.name;
  }

  public getProductId(): string {
    return this.productId;
  }

  public getPrice(): number {
    return this.price * this.quantity;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  private validate(): void {
    if (this.quantity <= 0) throw new Error('Quantity must be greater than zero');
  }
}
