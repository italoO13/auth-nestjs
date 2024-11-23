import {
  DeepPartial,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import IBaseRepository from './base.interface';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<T extends BaseEntity>
  implements IBaseRepository<T>
{
  constructor(readonly model: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.model.create(data);
    return this.model.save(entity);
  }

  async findById(id: number): Promise<T> {
    return this.model.findOne({
      where: { id } as FindOptionsWhere<T>,
      withDeleted: true,
    });
  }

  async findAll(filter?: FindOptionsWhere<T>): Promise<T[]> {
    return this.model.find({
      where: filter,
      withDeleted: true,
    });
  }

  async findByCondition(filterCondition: FindOneOptions<T>): Promise<T[]> {
    return this.model.find(filterCondition);
  }

  async updated(id: number, data: DeepPartial<T>): Promise<T> {
    const entity = await this.model.findOneByOrFail({
      id,
    } as FindOptionsWhere<T>);

    this.model.merge(entity, data);

    return this.model.save(entity);
  }

  async delete(id: number): Promise<void> {
    await this.model.delete(id);
  }

  async deleteVirtual(id: number): Promise<void> {
    const entity = await this.findById(id);
    entity.deletedAt = new Date();
    entity.deleted = true;
    await this.updated(id, entity);
  }
}
