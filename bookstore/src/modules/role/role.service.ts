import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Role } from './role.entity';
import { RoleRepository } from './role.repository';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException('el id debe existir');
    }

    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!role) {
      throw new NotFoundException('el usuario no existe');
    }

    return role;
  }

  async getAll(): Promise<Role[]> {
    const rolesAll: Role[] = await this._roleRepository.find({
      where: { status: 'ACTIVE' },
    });

    if (rolesAll.length === 0) {
      throw new NotFoundException('no se encontraron usuarios');
    }

    return rolesAll;
  }

  async create(role: Role): Promise<Role> {
    const savedRole: Role = await this._roleRepository.save(role);
    return savedRole;
  }

  async update(id: number, role: Role): Promise<string> {
    await this._roleRepository.createQueryBuilder().update(Role).set({name: role.name, description: role.description}).where('id = :id', { id }).execute();
    return 'UPDATED ROLE';
  }

  async delete(id: number): Promise<string> {
    const roleExist: Role = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!roleExist) {
      throw new NotFoundException('el usuario no existe');
    }

    await this._roleRepository.update(id, { status: 'INACTIVE' });
    return 'DELETED';
  }
}
