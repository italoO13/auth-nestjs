import { CreateAuthDto } from '../dto/create-auth.dto';
import { LoginDto } from '../dto/login.dto';
import { ResponseLoginDto } from '../dto/response-login.dto';
import { ResponseUserDto } from '../dto/response-user.dto';

export default interface IAuthService {
  create(createAuthDto: CreateAuthDto): Promise<ResponseUserDto>;
  login(loginDto: LoginDto): Promise<ResponseLoginDto>;
}
