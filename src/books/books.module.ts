import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Libro } from '../database/models/libro.model';
import { Genero } from '../database/models/genero.model';
import { Editorial } from '../database/models/editorial.model';

@Module({
  imports: [SequelizeModule.forFeature([Libro, Genero, Editorial])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
