import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Libro } from '../database/models/libro.model';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Op, WhereOptions, literal } from 'sequelize';
import { Parser as Json2csvParser } from 'json2csv';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Libro)
    private readonly libroModel: typeof Libro,
  ) {}

  async findAll(options: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
  }): Promise<{ rows: Libro[]; count: number }> {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'titulo',
      sortDir = 'asc',
    } = options;
    const offset = (page - 1) * limit;

    const whereClause: WhereOptions = {
      deleted_at: { [Op.is]: null },
    };

    const conditions: any[] = [
      { titulo: { [Op.iLike]: `%${search}%` } },
      { autor: { [Op.iLike]: `%${search}%` } },
      { '$genero.nombre$': { [Op.iLike]: `%${search}%` } },
      { '$editorial.nombre$': { [Op.iLike]: `%${search}%` } },
      literal(`CAST("Libro"."disponible" AS TEXT) ILIKE '%${search}%'`),
    ];

    (whereClause as WhereOptions)[Op.or] = conditions;

    const result = await this.libroModel.findAndCountAll({
      where: whereClause,
      include: ['editorial', 'genero'],
      offset,
      limit,
      order: [[sortBy, sortDir]],
      subQuery: false,
    });

    return {
      rows: result.rows,
      count: result.count,
    };
  }

  // async findAll(): Promise<Libro[]> {
  //   return this.libroModel.findAll({
  //     include: ['editorial', 'genero'],
  //     where: {
  //       deleted_at: {
  //         [Op.is]: null,
  //       } as any,
  //     },
  //   });
  // }

  async findOne(id: string): Promise<Libro> {
    const libro = await this.libroModel.findByPk(id, {
      include: ['editorial', 'genero'],
    });

    if (!libro || libro.deleted_at !== null) {
      throw new NotFoundException('Libro no encontrado');
    }

    return libro;
  }

  async create(data: CreateBookDto): Promise<Libro> {
    return this.libroModel.create(data); // ✅ Tipado aceptado gracias a LibroCreationAttrs
  }

  async update(id: string, data: UpdateBookDto): Promise<Libro> {
    const libro = await this.findOne(id);
    return libro.update(data);
  }

  async delete(id: string): Promise<void> {
    const libro = await this.findOne(id);
    await libro.update({ deleted_at: new Date() });
  }

  async exportCsv(): Promise<string> {
    const libros = await this.libroModel.findAll({
      where: { deleted_at: { [Op.is]: null } as any },
      include: ['editorial', 'genero'],
    });

    const data = libros.map((libro) => ({
      Titulo: libro.titulo,
      Autor: libro.autor,
      Genero: libro.genero?.nombre,
      Editorial: libro.editorial?.nombre,
      Precio: libro.precio,
      Disponible: libro.disponible ? 'Sí' : 'No',
    }));

    const fields = [
      'Titulo',
      'Autor',
      'Genero',
      'Editorial',
      'Precio',
      'Disponible',
    ];
    const parser = new Json2csvParser({ fields });
    return parser.parse(data);
  }
}
