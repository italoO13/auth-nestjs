import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import IAuthService from './interfaces/auth-service.inteface';
import { IUserRepository } from 'src/repositories/user/user.interface';
import { generatePassword } from 'src/utils/generate-password.utils';
import { Encrypt } from 'src/utils/encrypt.utils';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepository)
    private readonly userModel: IUserRepository,
    private readonly encrypt: Encrypt,
  ) {}

  private async validateCreateUser(createAuthDto: CreateAuthDto) {
    const { cpf, email } = createAuthDto;
    const user = await this.userModel.findByCondition({
      where: [{ cpf }, { email }],
    });

    if (user.length) {
      throw new ConflictException('user_already_exists');
    }
  }

  async create(createAuthDto: CreateAuthDto): Promise<ResponseUserDto> {
    await this.validateCreateUser(createAuthDto);
    const password = generatePassword(8);

    const newUser = await this.userModel.create({
      ...createAuthDto,
      password: await this.encrypt.encryptPassword(password),
    });

    return new ResponseUserDto(newUser);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
