import { ProductFactory } from '@src/domain/product/factory/product-factory';
import { ProductRepositoryInterface } from '@src/domain/product/repository/product-repository-interface';
import { InputCreateProductDto, OutputCreateProductDto } from './create-product-dto';

export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepositoryInterface) {}
  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.new(input.name, input.price);
    console.log('product factory called ', product);

    const result = await this.productRepository.create(product);

    return {
      id: result.createdId
    };
  }
}
