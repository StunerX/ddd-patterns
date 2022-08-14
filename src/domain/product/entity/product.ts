import { Entity } from '@src/domain/shared/entity/entity.abstract';
import { NotificationError } from '@src/domain/shared/notification/notification.error';
import { ProductValidatorFactory } from '../factory/product-validator-factory';

export class Product extends Entity {
  constructor(public override readonly id: string, private name: string, private price: number) {
    super(id);
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  private validate() {
    ProductValidatorFactory.create().validate(this);
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
