import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  Request,
  UseGuards,
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ResponseUserDto } from './dto/response-user.dto';
import { LoginDto, PayloadJwtDto } from './dto/login.dto';
import { ResponseLoginDto } from './dto/response-login.dto';
import { Public } from './decorators/public-auth.decorator';
import { ResponseFilterDto } from './dto/response-filter.dto';
import { AuthGuard } from './guards/jwt.guard';
import IAuthService from './interfaces/auth-service.inteface';

@ApiTags('Auth')
@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: IAuthService,
  ) {}

  @ApiResponse({
    status: 201,
    description: 'User created successfull',
    type: ResponseUserDto,
  })
  @ApiConflictResponse({ description: 'user already exists' })
  @Post()
  @HttpCode(201)
  async create(@Body() createAuthDto: CreateAuthDto): Promise<ResponseUserDto> {
    return await this.authService.create(createAuthDto);
  }

  @ApiResponse({
    status: 201,
    description: 'User successfully authenticated',
    type: ResponseLoginDto,
  })
  @Public()
  @ApiUnauthorizedResponse({ description: 'invalid_login' })
  @Post('login')
  @HttpCode(201)
  async login(@Body() loginDto: LoginDto): Promise<ResponseLoginDto> {
    return await this.authService.login(loginDto);
  }

  @ApiResponse({
    status: 200,
    description: 'List of Users',
    type: Array<ResponseUserDto>,
  })
  @HttpCode(200)
  @Get()
  async findAll(
    @Query() filters: ResponseFilterDto,
  ): Promise<ResponseUserDto[]> {
    return await this.authService.findAll(filters);
  }

  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: ResponseUserDto,
  })
  @ApiNotFoundResponse({ description: 'use_not_found' })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<ResponseUserDto> {
    return await this.authService.findOne(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'updated user',
    type: ResponseUserDto,
  })
  @ApiUnauthorizedResponse({ description: 'user_not_admin' })
  @Patch(':id')
  @HttpCode(200)
  update(
    @Param('id') id: string,
    @Body() updateAuthDto: UpdateAuthDto,
    @Request() { user },
  ): Promise<ResponseUserDto> {
    return this.authService.update(+id, updateAuthDto, user as PayloadJwtDto);
  }

  @ApiResponse({
    status: 200,
    description: 'Delete user by id',
  })
  @ApiNotFoundResponse({ description: 'user_not_found' })
  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.authService.remove(+id);
  }

  @ApiResponse({
    status: 200,
    description: 'Return info user me',
    type: ResponseUserDto,
  })
  @ApiNotFoundResponse({ description: 'user_not_found' })
  @HttpCode(200)
  @Post('me')
  async me(@Request() { user }): Promise<ResponseUserDto> {
    return await this.authService.me(user as PayloadJwtDto);
  }
}
