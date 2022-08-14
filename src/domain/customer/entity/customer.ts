import { Entity } from '@src/domain/shared/entity/entity.abstract';
import { NotificationError } from '@src/domain/shared/notification/notification.error';
import { CustomerValidatorFactory } from '../factory/customer-validator-factory';
import { Address } from './value-object/address';

export class Customer extends Entity {
  private _name: string;
  private _address: Address;
  private _active: boolean;
  private _rewardPoints = 0;

  constructor(public readonly id: string, name: string) {
    super(id);
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  public validate() {
    CustomerValidatorFactory.create().validate(this);
  }

  public get name(): string {
    return this._name;
  }

  public get address(): Address {
    return this._address;
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

  public get rewardPoints(): number {
    return this._rewardPoints;
  }

  public addRewardPoint(points: number) {
    this._rewardPoints += points;
  }
}
