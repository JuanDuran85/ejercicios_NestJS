import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe
} from '@nestjs/common';

import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get(':id')
  async getRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    const role = await this.roleService.get(id);
    return role;
  }

  @Get()
  async getRoles(): Promise<Role[]> {
    const roles = await this.roleService.getAll();
    return roles;
  }

  @Post()
  async createRole(@Body() role: Role): Promise<Role> {
    const newRole = await this.roleService.create(role);
    return newRole;
  }

  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: Role,
  ): Promise<string> {
    const updatedRole = await this.roleService.update(id, role);
    return updatedRole;
  }

  @Delete(':id')
  async deleteRole(@Param('id', ParseIntPipe) id: number): Promise<string> {
    const deletedRole = await this.roleService.delete(id);
    return deletedRole;
  }
}
