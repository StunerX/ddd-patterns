import RepositoryInterface from '@src/domain/shared/repository/repository-interface';
import { Order } from '../entity/order';

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {}
