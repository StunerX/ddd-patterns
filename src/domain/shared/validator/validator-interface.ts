import { Entity } from '../entity/entity.abstract';

export interface ValidatorInterface<T extends Entity> {
  validate(entity: T): void;
}
