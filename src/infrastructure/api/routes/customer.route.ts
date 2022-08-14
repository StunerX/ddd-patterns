import { CustomerRepository } from '@src/infrastructure/customer/repository/prisma/customer-repository';
import { CreateCustomerUseCase } from '@src/usecase/customer/create/create-customer';
import { ListCustomerUseCase } from '@src/usecase/customer/list/list-customer';
import express, { Request, Response } from 'express';
export const customerRoute = express.Router();

customerRoute.post('/', async (request: Request, response: Response) => {
  try {
    const usecase = new CreateCustomerUseCase(new CustomerRepository());
    const { street, number, zipCode, city } = request.body.address;
    const customerDto = {
      name: request.body.name,
      address: { street, number, zipCode, city }
    };
    const output = await usecase.execute(customerDto);
    response.status(200).json(output);
  } catch (error) {
    response.status(500).send(error);
  }
});

customerRoute.get('/', async (request: Request, response: Response) => {
  try {
    const usecase = new ListCustomerUseCase(new CustomerRepository());

    const output = await usecase.execute();
    response.status(200).json(output);
  } catch (error) {
    response.status(500).send(error);
  }
});
