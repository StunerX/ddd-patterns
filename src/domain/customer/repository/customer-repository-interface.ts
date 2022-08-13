import RepositoryInterface from '@src/domain/shared/repository/repository-interface';
import { Customer } from '../entity/customer';

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {}
