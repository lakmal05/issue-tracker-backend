import { Injectable } from '@nestjs/common';
import { RoleAbstractRepository } from './role.abstract.repository';
import {
  ChangeStreamRefineCollectionShardKeyDocument,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { RoleEntity } from '../entites/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleMapper } from '../mappers/role.mapper';
import { RolePermissionEntity } from 'src/role-permission-management/role-permission/infrastructure/entites/role-permission.entity';
import { PermissionEntity } from 'src/role-permission-management/permission/infrastructure/entites/permission.entity';
import { StatusEnum } from 'src/common/enum/status.enum';
import { RoleDto } from '../../dto/role.dto';
interface ModifiedPermission {
  id: string;
  code: string;
  description: string | null;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  __entity: string;
  hasPermission: boolean;
  children: ModifiedPermission[];
}
@Injectable()
export class RoleRepository implements RoleAbstractRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async findById(roleId: string, withPermission: boolean) {
    if (withPermission === true) {
      const roleWithPermission = await this.rolePermissionRepository.find({
        where: {
          role: {
            id: roleId,
          },
        },
        relations: {
          permission: true,
        },
      });
      const allPermissions = await this.permissionRepository.find();

      const permissionMap = new Map<string, boolean>();
      roleWithPermission.forEach((rolePermission) => {
        permissionMap.set(rolePermission.permission.id, true);
      });

      // Map original permissions to ModifiedPermission type
      const modifiedPermissions: any = allPermissions.map((permission) => ({
        id: permission.id,
        code: permission.code,
        description: permission.description,
        parentId: permission.parentId,
        hasPermission: permissionMap.has(permission.id),
        children: [],
      }));

      modifiedPermissions.forEach((permission: any) => {
        permission.children = allPermissions
          .filter((child) => child.parentId === permission.id)
          .map((child) => ({
            id: child.id,
            code: child.code,
            description: child.description,
            parentId: child.parentId,
            hasPermission: permissionMap.has(child.id),
            children: [],
          }));
      });

      // Filter out permissions with parentIds (keeping only top-level permissions)
      const topLevelPermissions = modifiedPermissions.filter(
        (permission) => !permission.parentId,
      );

      return topLevelPermissions;
    }
  }

  /**
   * find all roles, filter out only status == ACTIVE or stauts ==ACTIVE and INACTIVE
   * @param status number
   * @returns retrun the array of all roles filtered
   */
  async findAll(status?: number) {
    if (!status) {
      const allRoles = await this.roleRepository.find({
        where: {
          status: In([StatusEnum.ACTIVE, StatusEnum.INACTIVE]),
        },
        order: {
          isDefault: 'ASC', // Order by isDefault in ascending order (false first, true second)
        },
      });
      return RoleMapper.toDomain(allRoles);
    } else {
      const allRoles = await this.roleRepository.find({
        where: {
          status: StatusEnum.ACTIVE,
        },
      });
      return RoleMapper.toDomain(allRoles);
    }
  }

  findByName(roleName: string) {
    return this.roleRepository.findOne({
      where: {
        name: ILike(`%${roleName}%`),
      },
    });
  }

  async create(data: RoleDto): Promise<RoleEntity> {
    const newRole = this.roleRepository.create({
      name: data.name,
    });
    return await this.roleRepository.save(newRole);
  }

  async update(roleId: string, data: any) {
    console.log(roleId, data);

    return await this.roleRepository.update(roleId, data);
  }
  findRoleByRoleName(roleName: string) {
    return this.roleRepository.findOne({
      where: {
        name: roleName,
      },
    });
  }

  // } else if (withPermission === false) {
  //   const role = await this.roleRepository.findOne({
  //     where: {
  //       id: roleId,
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       status: true,
  //     },
  //   });
  //   return RoleMapper.toDomain(role);
  // }
}

// const permissionMap = new Map<string, boolean>();
// roleWithPermission.forEach((rolePermission) => {
//     permissionMap.set(rolePermission.permission.id, true);
// });

// // Map original permissions to ModifiedPermission type
// const modifiedPermissions: ModifiedPermission[] = allPermissions.map(permission => ({
//     id: permission.id,
//     code: permission.code,
//     description: permission.description,
//     parentId: permission.parentId,
//     createdAt: permission.createdAt,
//     updatedAt: permission.updatedAt,
//     __entity: permission.__entity,
//     hasPermission: permissionMap.has(permission.id), // Determine if permission has permission
// }));

// // Populate children for each permission
// modifiedPermissions.forEach(permission => {
//     permission.children = allPermissions.filter(child => child.parentId === permission.id)
//         .map(child => ({
//             id: child.id,
//             code: child.code,
//             description: child.description,
//             parentId: child.parentId,
//             createdAt: child.createdAt,
//             updatedAt: child.updatedAt,
//             __entity: child.__entity,
//             hasPermission: permissionMap.has(child.id), // Determine if child permission has permission
//         }));
// });

// // Filter out permissions with parentIds (keeping only top-level permissions)
// const topLevelPermissions = modifiedPermissions.filter(permission => !permission.parentId);

// return topLevelPermissions;
