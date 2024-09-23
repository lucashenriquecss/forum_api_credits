import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { Roles } from '../../users/entities/user-roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user,url } = context.switchToHttp().getRequest();
    if (user.roles === 'user' && ['/thread','/comment'].includes(url)) {
      return requiredRoles.some((role) => user.roles?.includes(role) && user.has_access === true)
    }
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
