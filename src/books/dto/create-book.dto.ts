import {
  IsString,
  IsUUID,
  IsNumber,
  IsBoolean,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    example: 'Cien años de soledad',
    description: 'Título del libro',
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    example: 'Gabriel García Márquez',
    description: 'Autor del libro',
  })
  @IsString()
  @IsNotEmpty()
  autor: string;

  @ApiProperty({ example: 'uuid-genero', description: 'ID del género' })
  @IsUUID()
  genero_id: string;

  @ApiProperty({ example: 'uuid-editorial', description: 'ID de la editorial' })
  @IsUUID()
  editorial_id: string;

  @ApiProperty({ example: 14990, description: 'Precio del libro en CLP' })
  @IsNumber()
  precio: number;

  @ApiProperty({ example: true, description: 'Disponibilidad en stock' })
  @IsBoolean()
  disponible: boolean;

  @IsString()
  @ApiProperty({
    example: '/uploads/libros/uuid.jpg',
    description: 'Ruta de la imagen',
    required: false,
  })
  imagen?: string;
}
