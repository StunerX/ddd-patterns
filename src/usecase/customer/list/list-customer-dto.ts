export interface InputListCustomerDto {}

export interface OutputListCustomerDto {
  customers: {
    id: string;
    name: string;
    address: {
      street: string;
      city: string;
      number: number;
      zipCode: string;
    };
  }[];
}
