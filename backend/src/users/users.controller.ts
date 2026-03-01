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
import { PermissionsGuard } from 'src/auth/guards/permissions.guard';
import { RequirePermissions } from 'src/auth/decorators/permissions.decorator';
import { PermissionEnum } from 'src/enum/permission';

@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @RequirePermissions(PermissionEnum.VIEW_USER)
  @Get()
  async getAllUser(): Promise<Array<GetUserResponse>> {
    return await this.usersService.getAllUser();
  }

  @RequirePermissions(PermissionEnum.VIEW_USER)
  @Get(':id')
  async getUserDetails(
    @Param('id') id: string,
  ): Promise<GetUserDetailResponse> {
    return await this.usersService.getUserDetails(id);
  }

  @RequirePermissions(PermissionEnum.EDIT_USER_INFO)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateData: UpdateUserDto) {
    return this.usersService.updateUser(id, updateData);
  }

  @RequirePermissions(PermissionEnum.CAN_DELETE)
  @Delete(':id')
  async removeUser(@Param('id', ParseUUIDPipe) userId: string) {
    return this.usersService.softDeleteUser(userId);
  }
}
