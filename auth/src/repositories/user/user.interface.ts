import IBaseRepository from '../base/base.interface';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository extends IBaseRepository<UserEntity> {}

export const IUserRepository = Symbol('IUserRepository');
