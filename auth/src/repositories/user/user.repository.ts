import { Repository } from 'typeorm';
import { BaseRepository } from '../base/base.repository';
import { UserEntity } from '../entities/user.entity';
import IUserRepository from './user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UserRepository
  extends BaseRepository<UserEntity>
  implements IUserRepository
{
  constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(repository);
  }
}
