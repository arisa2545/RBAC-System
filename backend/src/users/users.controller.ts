import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  GetUserDetailResponse,
  GetUserResponse,
} from './interface/user.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAllUser(): Promise<Array<GetUserResponse>> {
    return await this.usersService.getAllUser();
  }

  @Get(':id')
  async getUserDetails(
    @Param('id') id: string,
  ): Promise<GetUserDetailResponse> {
    return await this.usersService.getUserDetails(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
    return this.usersService.updateUser(id, updateData);
  }

  @Delete(':id')
  async removeUser(@Param('id', ParseUUIDPipe) userId: string) {
    return this.usersService.softDeleteUser(userId);
  }
}
