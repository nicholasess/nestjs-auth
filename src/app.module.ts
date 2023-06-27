import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import {
  AuthenticationServices,
  AuthenticationModels,
} from '@/common/services/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    ...AuthenticationModels,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...AuthenticationServices],
})
export class AppModule {}
