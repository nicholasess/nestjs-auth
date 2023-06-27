import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModels } from './models';

@Module({
  imports: [UserModels],
  providers: [UserService],
  controllers: [],
})
export class UserModule {}
