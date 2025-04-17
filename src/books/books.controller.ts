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
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';
// import { diskStorage } from 'multer';
// import * as path from 'path';
// import { v4 as uuidv4 } from 'uuid';
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
  ApiConsumes,
  ApiBody,
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
  async exportCsv(@Res() res: Response) {
    const csv = await this.booksService.exportCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=libros.csv');
    res.status(200).send(csv);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar libros con filtros, paginación y ordenamiento',
  })
  @ApiResponse({ status: 200, description: 'Lista de libros paginada' })
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('search') rawSearch: string,
    @Query('sort_by') sortBy: string,
    @Query('sort_dir') sortDir: 'asc' | 'desc',
  ) {
    const search = rawSearch?.replace(/^'+|'+$/g, '').trim() || '';
    return this.booksService.findAll({
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      search,
      sortBy,
      sortDir,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un libro por ID' })
  @ApiResponse({ status: 200, description: 'Libro encontrado' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('imagen', {
  //     storage: diskStorage({
  //       destination: './uploads/libros',
  //       filename: (_req, file, cb) => {
  //         const ext = path.extname(file.originalname);
  //         const filename = `${uuidv4()}${ext}`;
  //         cb(null, filename);
  //       },
  //     }),
  //   }),
  // )
  // @ApiConsumes('multipart/form-data')
  // @ApiOperation({ summary: 'Crear un nuevo libro con imagen' })
  // @ApiResponse({ status: 201, description: 'Libro creado' })
  // @ApiBody({
  //   description: 'Datos del libro',
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       titulo: { type: 'string' },
  //       autor: { type: 'string' },
  //       genero_id: { type: 'string', format: 'uuid' },
  //       editorial_id: { type: 'string', format: 'uuid' },
  //       precio: { type: 'number' },
  //       disponible: { type: 'boolean' },
  //       imagen: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //     required: [
  //       'titulo',
  //       'autor',
  //       'genero_id',
  //       'editorial_id',
  //       'precio',
  //       'disponible',
  //     ],
  //   },
  // })
  // async create(
  //   @UploadedFile() imagen: Express.Multer.File,
  //   @Body() dto: CreateBookDto & { imagen?: string },
  // ) {
  //   if (imagen) {
  //     dto.imagen = `/uploads/libros/${imagen.filename}`;
  //   }
  //   return this.booksService.create(dto);
  // }

  @Post()
  @UseInterceptors(FileInterceptor('imagen', multerConfig))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Crear un nuevo libro con imagen' })
  @ApiResponse({ status: 201, description: 'Libro creado' })
  @ApiBody({
    description: 'Datos del libro con imagen',
    schema: {
      type: 'object',
      properties: {
        titulo: { type: 'string' },
        autor: { type: 'string' },
        genero_id: { type: 'string', format: 'uuid' },
        editorial_id: { type: 'string', format: 'uuid' },
        precio: { type: 'number' },
        disponible: { type: 'boolean' },
        imagen: { type: 'string', format: 'binary' },
      },
    },
  })
  async create(
    @UploadedFile() imagen: Express.Multer.File,
    @Body() dto: CreateBookDto & { imagen?: string },
  ) {
    if (imagen) {
      dto.imagen = `/uploads/libros/${imagen.filename}`;
    }
    if (dto.precio) {
      dto.precio = Number(dto.precio);
    }
    if (dto.disponible !== undefined) {
      if (typeof dto.disponible === 'string') {
        dto.disponible = dto.disponible === 'true';
      }
    }
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
