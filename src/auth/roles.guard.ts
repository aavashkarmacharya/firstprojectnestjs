import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { roles } from 'src/common/enums/roles.enum';
import { roles_key, Roles } from './roles.decorator';
@Injectable()
export class roleguard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const reqrole = this.reflector.getAllAndOverride<roles[]>(roles_key, [
      context.getClass(),
      context.getHandler(),
    ]);
    if (!reqrole) {
      return true;
    }
    {
      const user = context.switchToHttp().getRequest().user;
      const checkrequirement = reqrole.some((roles) => user.Roles === roles);
      return checkrequirement;
    }
  }
}
