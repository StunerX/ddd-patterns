export default interface RepositoryInterface<T> {
  create(entity: T): Promise<{ createdId: string }>;
  find(id: string): Promise<T | null>;
  findAll(): Promise<T[] | null>;
  update(entity: T): Promise<{ id: string }>;
}
