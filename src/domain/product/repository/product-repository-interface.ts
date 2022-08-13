import RepositoryInterface from '@src/domain/shared/repository/repository-interface';
import { Product } from '../entity/product';

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {}
