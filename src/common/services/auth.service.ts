import { AuthService } from '@/modules/auth/auth.service';
import { UserService } from '@/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserModels } from '@/modules/user/models';

export const AuthenticationServices = [UserService, JwtService, AuthService];
export const AuthenticationModels = [UserModels];
