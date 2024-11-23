import IBaseRepository from '../base/base.interface';
import { UserEntity } from '../entities/user.entity';

export default interface IUserRepository extends IBaseRepository<UserEntity> {}
