import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    example: 'juan@correo.com',
    description: 'Correo electrónico válido',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'secreto123',
    description: 'Contraseña con mínimo 6 caracteres',
  })
  @MinLength(6)
  password: string;
}
