import { SetMetadata } from '@nestjs/common';
import { roles } from 'src/common/enums/roles.enum';

export const roles_key = 'roles';
export const Roles = (...roles: roles[]) => SetMetadata(roles_key, roles);
