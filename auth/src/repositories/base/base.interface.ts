import {
  BaseEntity,
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';

export default interface IBaseRepository<T extends BaseEntity> {
  findAll(filter?: FindOptionsWhere<T>): Promise<T[]>;
  create(data: DeepPartial<T>): Promise<T>;
  updated(id: number, data: DeepPartial<T>): Promise<T>;
  findByCondition(filterCondition: FindOneOptions<T>): Promise<T[]>;
  findById(id: number): Promise<T>;
  deleteVirtual(id: number): Promise<void>;
  delete(id: number): Promise<void>;
}
