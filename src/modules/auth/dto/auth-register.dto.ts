import { IsEmail, IsString, MinLength, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserType } from 'src/modules/user/models/user.model';

export class AuthRegisterDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    enum: Object.values(UserType),
  })
  @IsString()
  @IsIn(Object.values(UserType))
  type: string;
}
