export class Address {
  constructor(
    private readonly street: string,
    private readonly number: number,
    private readonly zipCode: string,
    private readonly city: string
  ) {
    this.validate();
  }

  private validate() {
    if (!this.street) throw new Error('Street is required');

    if (!this.number) throw new Error('Number is required');

    if (!this.zipCode) throw new Error('ZipCode is required');

    if (!this.city) throw new Error('City is required');
  }

  public toString() {
    return `${this.street}, ${this.number}, ${this.zipCode}, ${this.city}`;
  }
}
