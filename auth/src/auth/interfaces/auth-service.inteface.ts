import { CreateAuthDto } from '../dto/create-auth.dto';

export default interface IAuthService {
  create(createAuthDto: CreateAuthDto): Promise<any>;
}
