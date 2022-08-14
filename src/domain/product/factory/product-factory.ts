import { Product } from '../entity/product';
import { v4 as uuid } from 'uuid';

export class ProductFactory {
  static new(name: string, price: number): Product {
    return new Product(uuid(), name, price);
  }
}
