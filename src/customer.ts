import { Address } from './address';

export class Customer {
  private _id: string;
  private _name: string;
  private _address: Address;
  private _active: boolean;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  public validate() {
    if (!this._id) throw new Error('Id is required');

    if (!this._name) throw new Error('Name is required');
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get address(): string {
    return this._address.toString();
  }

  public get active(): boolean {
    return this._active;
  }

  public activate() {
    if (!this._address) throw new Error('Address is missing');
    this._active = true;
  }

  public deactivate() {
    this._active = false;
  }

  public changeName(name: string) {
    this._name = name;
  }

  public changeAddress(street: string, number: number, zipCode: string, city: string) {
    this._address = new Address(street, number, zipCode, city);
  }
}
