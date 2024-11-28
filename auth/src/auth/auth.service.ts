import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import IAuthService from './interfaces/auth-service.inteface';
import { IUserRepository } from 'src/repositories/user/user.interface';
import { generatePassword } from 'src/utils/generate-password.utils';
import { Encrypt } from 'src/utils/encrypt.utils';
import { ResponseUserDto } from './dto/response-user.dto';
import { LoginDto, PayloadJwtDto } from './dto/login.dto';
import { UserEntity } from 'src/repositories/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ResponseLoginDto } from './dto/response-login.dto';
import { Roles } from 'src/repositories/types/roles.type';
import { ResponseFilterDto } from './dto/response-filter.dto';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(IUserRepository)
    private readonly userModel: IUserRepository,
    private readonly encrypt: Encrypt,
    private readonly jwtService: JwtService,
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
    console.log(password);
    const newUser = await this.userModel.create({
      ...createAuthDto,
      password: await this.encrypt.encryptPassword(password),
    });

    return new ResponseUserDto(newUser);
  }

  private async validateLogin(loginDto: LoginDto): Promise<UserEntity> {
    const { email, password } = loginDto;
    const user = await this.userModel.findByCondition({
      where: { email },
    });

    if (!user.length) {
      throw new UnauthorizedException('login_invalid');
    }

    const isPasswordValid = this.encrypt.comparePassword(
      password,
      user[0].password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('login_invalid');
    }

    return user[0];
  }

  async login(loginDto: LoginDto): Promise<ResponseLoginDto> {
    const user = await this.validateLogin(loginDto);

    const payload = {
      sub: user.id,
      roles: user.role,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return new ResponseLoginDto(token, new ResponseUserDto(user));
  }

  async findAll(filter: ResponseFilterDto): Promise<ResponseUserDto[]> {
    const users = await this.userModel.findAll(filter);
    return users.map((user) => new ResponseUserDto(user));
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException('user_not_found');
    }

    return new ResponseUserDto(user);
  }

  private validatePermitionUpdate(
    id: number,
    updateAuthDto: UpdateAuthDto,
    user: PayloadJwtDto,
  ) {
    if (user.roles !== updateAuthDto?.role && user.roles !== Roles.ADMIN) {
      throw new UnauthorizedException('user_not_admin');
    }
    if (id !== user.sub) {
      throw new UnauthorizedException('user_not_admin');
    }
  }

  async update(
    id: number,
    updateAuthDto: UpdateAuthDto,
    user: PayloadJwtDto,
  ): Promise<ResponseUserDto> {
    this.validatePermitionUpdate(id, updateAuthDto, user);
    const updatedUser = await this.userModel.updated(id, updateAuthDto);
    return new ResponseUserDto(updatedUser);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.userModel.deleteVirtual(id);
  }

  async me(payload: PayloadJwtDto): Promise<ResponseUserDto> {
    const user = await this.findOne(payload.sub);
    return user;
  }
}
