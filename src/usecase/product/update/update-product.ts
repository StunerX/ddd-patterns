import { Product } from '@src/domain/product/entity/product';
import { ProductRepositoryInterface } from '@src/domain/product/repository/product-repository-interface';
import { InputUpdateProductDto, OutputUpdateProductDto } from './update-product-dto';

export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}
  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = new Product(input.id, input.name, input.price);

    const result = await this.productRepository.update(product);

    return {
      id: result.id
    };
  }
}
