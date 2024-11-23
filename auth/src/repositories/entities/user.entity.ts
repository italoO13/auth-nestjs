import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Roles } from '../types/roles.type';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ length: 500, nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  role: Roles;
}
