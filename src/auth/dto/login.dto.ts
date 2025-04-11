import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'juan@correo.com',
    description: 'Correo del usuario registrado',
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'secreto123', description: 'Contraseña del usuario' })
  @MinLength(6)
  password: string;
}
