import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProduces,
} from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('export')
  @ApiOperation({ summary: 'Exportar libros en formato CSV' })
  @ApiResponse({ status: 200, description: 'Archivo CSV generado' })
  @ApiProduces('text/csv')
  async exportCsv(@Res() res: Response) {
    const csv = await this.booksService.exportCsv();

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=libros.csv');
    res.status(200).send(csv);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los libros disponibles' })
  @ApiResponse({ status: 200, description: 'Lista de libros' })
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un libro por ID' })
  @ApiResponse({ status: 200, description: 'Libro encontrado' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo libro' })
  @ApiResponse({ status: 201, description: 'Libro creado' })
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un libro' })
  @ApiResponse({ status: 200, description: 'Libro actualizado' })
  update(@Param('id') id: string, @Body() dto: UpdateBookDto) {
    return this.booksService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar (soft delete) un libro' })
  @ApiResponse({ status: 200, description: 'Libro eliminado (soft)' })
  delete(@Param('id') id: string) {
    return this.booksService.delete(id);
  }
}
