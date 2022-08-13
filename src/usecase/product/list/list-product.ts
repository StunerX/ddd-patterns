import { ProductRepositoryInterface } from '@src/domain/product/repository/product-repository-interface';
import { OutputListProductDto } from './list-product-dto';

export class ListProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}
  async execute(): Promise<OutputListProductDto | null> {
    const productsResult = await this.productRepository.findAll();

    if (!productsResult || productsResult.length === 0) return null;

    const products = productsResult.map((product) => {
      return {
        id: product.getId(),
        name: product.getName(),
        price: product.getPrice()
      };
    });

    return {
      products
    };
  }
}
