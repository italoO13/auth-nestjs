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

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  async findAll(@Query() filters): Promise<ResponseUserDto[]> {
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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
