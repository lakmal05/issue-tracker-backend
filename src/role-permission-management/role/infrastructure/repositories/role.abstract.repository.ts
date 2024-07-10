import { Role } from 'src/role-permission-management/role/domain/role';

export abstract class RoleAbstractRepository {
  abstract findById(roleId: string, withPermission: boolean);

  abstract findAll(status?: number);

  abstract create(
    data: Omit<Role, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  );

  abstract findByName(roleName: string);

  // abstract changeStatus();

  abstract update(roleId: string, data: any);
  abstract findRoleByRoleName(roleName: string);
}
