import { JwtModule as JwtMdl } from '@nestjs/jwt';

export const JwtModule = JwtMdl.register({
  secret: process.env.JWT_SECRET,
});
