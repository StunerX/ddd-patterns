import { Customer } from '../entity/customer';
import { v4 as uuid } from 'uuid';

export class CustomerFactory {
  public static create(name: string): Customer {
    const customer = new Customer(uuid(), name);
    return customer;
  }

  public static createWithAddress(name: string, street: string, number: number, zipCode: string, city: string) {
    const customer = this.create(name);
    customer.changeAddress(street, number, zipCode, city);
    return customer;
  }
}
