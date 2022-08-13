import { Customer } from '@src/domain/entity/customer';
import { CustomerRepositoryInterface } from '@src/domain/repository/customer-repository-interface';
import prisma from '../db/prisma/client';

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<{ createdId: string }> {
    const customer = await prisma.customer.create({
      data: {
        name: entity.name,
        street: entity.address.getStreet(),
        number: entity.address.getNumber(),
        zipCode: entity.address.getZipCode(),
        city: entity.address.getCity(),
        active: entity.active,
        rewardPoints: entity.rewardPoints
      }
    });

    return {
      createdId: customer.id
    };
  }
  async find(id: string): Promise<Customer | null> {
    const resultCustomer = await prisma.customer.findFirst({
      where: { id }
    });

    if (!resultCustomer?.id) return null;

    const { name, street, number, zipCode, city, active, rewardPoints } = resultCustomer;
    const customer = new Customer(resultCustomer.id, name);
    customer.changeAddress(street, number, zipCode, city);
    customer.addRewardPoint(rewardPoints);

    if (active) {
      customer.activate();
    } else {
      customer.deactivate();
    }

    return customer;
  }
  async findAll(): Promise<Customer[] | null> {
    const customerResult = await prisma.customer.findMany({});

    return customerResult.map((c) => {
      const { name, street, number, zipCode, city, rewardPoints } = c;
      const customer = new Customer(c.id, name);
      customer.changeAddress(street, number, zipCode, city);
      customer.addRewardPoint(rewardPoints);

      return customer;
    });
  }
  async update(entity: Customer): Promise<{ id: string }> {
    const product = await prisma.customer.update({
      where: { id: entity.id },
      data: {
        name: entity.name,
        street: entity.address.getStreet(),
        number: entity.address.getNumber(),
        zipCode: entity.address.getZipCode(),
        city: entity.address.getCity(),
        active: entity.active,
        rewardPoints: entity.rewardPoints
      }
    });

    return {
      id: product.id
    };
  }
}
