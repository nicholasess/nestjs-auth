import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

interface Register {
  email: string;
  password: string;
  name: string;
  type: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createToken(id: string) {
    return {
      accessToken: this.JwtService.sign(
        {
          id,
        },
        {
          expiresIn: '7 days',
          issuer: 'Api NestJs',
        },
      ),
    };
  }

  checkToken(token: string): { id: string } {
    try {
      const data = this.JwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      return data;
    } catch (error) {
      throw new HttpException('message', 400, {
        cause: error,
      });
    }
  }

  async login(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!user) {
      throw new HttpException('message', 400, {
        cause: new Error(''),
      });
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new HttpException('message', 400, {
        cause: new Error(''),
      });
    }

    return this.createToken(user._id);
  }
  async register({ name, email, password, type }: Register) {
    const user = await this.userService.findOne(email);

    if (user)
      throw new HttpException('message', 400, {
        cause: new Error('User already exists'),
      });

    const newUser = await this.userService.create({
      name,
      email,
      password,
      type,
    });

    return this.createToken(newUser._id);
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async me(token: string) {
    const decode = this.checkToken(token);

    const user = await this.userService.findById(decode.id);

    return {
      _id: user._id,
      name: user.name,
      image: user.image,
      type: user.type,
    };
  }
}
