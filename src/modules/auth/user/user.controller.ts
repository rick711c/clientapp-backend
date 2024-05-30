import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/cerateUser.dto';
import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorators/public.decorator';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { CurrentUserInfo } from 'src/lib/interfaces/index.interface';

@Controller('/user')

export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.registerUser(createUserDto);
    } catch (e) {
      throw e;
    }
  }

  @Get('/')
  async getUserDetailsById(@Query('userId') userId: string) {
    try {
      return this.userService.getUserDetailsById(userId);
    } catch (err) {
      throw err;
    }
  }

  @Public()
  @Post('/login')
  async login(@Body() credentials: LoginDto) {
    try {
      return this.userService.login(credentials);
    } catch (err) {
      throw err;
    }
  }

  @Get('/newAccessToken')
  async generateAccessTokenByRefreshToken(
    @Query('userId') userId: string,
    @Query('refreshToken') refreshToken: string,
  ) {
    try {
      return this.userService.generateAccessTokenByRefreshToken(
        userId,
        refreshToken,
      );
    } catch (err) {}
  }

  @Patch()
  async updateUser(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user:CurrentUserInfo){
    try{
      return this.userService.updateUser(updateUserDto,user);
    }catch (err){
      throw err;
    }
  }
}
