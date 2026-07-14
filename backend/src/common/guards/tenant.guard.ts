import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    if (user.role === 'admin') {
      return true;
    }

    if (!user.tenantId) {
      throw new ForbiddenException('Usuário não vinculado a um tenant');
    }

    return true;
  }
}
