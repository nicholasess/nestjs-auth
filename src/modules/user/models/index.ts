import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';

export const UserModels = MongooseModule.forFeature([
  { name: 'User', schema: UserSchema },
]);
