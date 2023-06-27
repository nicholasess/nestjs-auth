import {
  Injectable,
  ExecutionContext,
  CanActivate,
  HttpException,
} from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly AuthService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const isValid = this.AuthService.isValidToken(
        request.headers?.authorization,
      );

      if (isValid) {
        request.user = await this.AuthService.me(
          request.headers?.authorization,
        );
        return true;
      }

      return false;
    } catch (error) {
      throw new HttpException('message', 400, {
        cause: error,
      });
    }
  }
}
