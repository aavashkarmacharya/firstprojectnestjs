import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roles } from 'src/common/enums/roles.enum';
import { roles_key, Roles } from './roles.decorator';

export class roleguard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const reqrole = this.reflector.getAllAndOverride<roles[]>(roles_key, [
      context.getClass(),
      context.getHandler(),
    ]);
    const user = context.switchToHttp().getRequest().user;
    const checkrequirement = reqrole.some((roles) => user.Roles === roles);
    return checkrequirement;
  }
}
