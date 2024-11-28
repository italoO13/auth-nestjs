import { CreateAuthDto } from '../dto/create-auth.dto';
import { LoginDto, PayloadJwtDto } from '../dto/login.dto';
import { ResponseFilterDto } from '../dto/response-filter.dto';
import { ResponseLoginDto } from '../dto/response-login.dto';
import { ResponseUserDto } from '../dto/response-user.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';

export default interface IAuthService {
  create(createAuthDto: CreateAuthDto): Promise<ResponseUserDto>;
  login(loginDto: LoginDto): Promise<ResponseLoginDto>;
  findAll(filter: ResponseFilterDto): Promise<ResponseUserDto[]>;
  findOne(id: number): Promise<ResponseUserDto>;
  update(
    id: number,
    updateAuthDto: UpdateAuthDto,
    user: PayloadJwtDto,
  ): Promise<ResponseUserDto>;
  remove(id: number): Promise<void>;
  me(payload: PayloadJwtDto): Promise<ResponseUserDto>;
}

export const IAuthService = Symbol('IAuthService');
