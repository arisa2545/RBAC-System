import { IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsNotEmpty({ message: 'Username required' })
  @IsString()
  username: string;

  @IsNotEmpty({ message: 'Password required' })
  @IsString()
  password: string;
}
