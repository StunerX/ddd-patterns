import { ProductRepository } from '@src/infrastructure/product/repository/prisma/product-repository';
import { CreateProductUseCase } from '@src/usecase/product/create/create-product';
import { ListProductUseCase } from '@src/usecase/product/list/list-product';
import express, { Request, Response } from 'express';
export const productRoute = express.Router();

productRoute.post('/', async (request: Request, response: Response) => {
  try {
    const usecase = new CreateProductUseCase(new ProductRepository());
    const { name, price } = request.body;
    const productDto = {
      name,
      price
    };
    const output = await usecase.execute(productDto);
    response.status(200).json(output);
  } catch (error) {
    response.status(500).send(error);
  }
});

productRoute.get('/', async (request: Request, response: Response) => {
  try {
    const usecase = new ListProductUseCase(new ProductRepository());

    const output = await usecase.execute();
    response.status(200).json(output);
  } catch (error) {
    response.status(500).send(error);
  }
});
