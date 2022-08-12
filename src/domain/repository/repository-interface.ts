export default interface RepositoryInterface<T> {
  create(entity: T): Promise<{ createdId: string }>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
  update(entity: T): Promise<{ createdId: string }>;
}
