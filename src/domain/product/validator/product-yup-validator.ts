import { ValidatorInterface } from '@src/domain/shared/validator/validator-interface';
import * as yup from 'yup';
import { Product } from '../entity/product';

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate(entity: Product): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup.number().required('Price is required').positive('Price is required')
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.getName(),
            price: entity.getPrice()
          },
          {
            abortEarly: false
          }
        );
    } catch (error) {
      const e = error as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: 'product',
          message: error
        });
      });
    }
  }
}
