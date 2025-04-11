import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let booksService: {
    findAll: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
    exportCsv: jest.Mock;
  };

  beforeEach(async () => {
    booksService = {
      findAll: jest.fn().mockResolvedValue([{ titulo: 'Libro 1' }]),
      findOne: jest.fn().mockResolvedValue({ titulo: 'Libro 1' }),
      create: jest.fn().mockResolvedValue({ titulo: 'Nuevo libro' }),
      update: jest.fn().mockResolvedValue({ titulo: 'Actualizado' }),
      delete: jest.fn().mockResolvedValue(undefined),
      exportCsv: jest.fn().mockResolvedValue('csv,data\n1,test'),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: booksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('debería retornar todos los libros', async () => {
    const libros = await controller.findAll();
    expect(libros).toHaveLength(1);
  });

  it('debería retornar un libro por ID', async () => {
    const libro = await controller.findOne('abc');
    expect(libro.titulo).toBe('Libro 1');
  });

  it('debería crear un nuevo libro', async () => {
    const result = await controller.create({
      titulo: 'Nuevo libro',
    } as any);
    expect(result.titulo).toBe('Nuevo libro');
  });

  it('debería actualizar un libro', async () => {
    const result = await controller.update('123', {
      titulo: 'Actualizado',
    } as any);
    expect(result.titulo).toBe('Actualizado');
  });

  it('debería eliminar un libro', async () => {
    const result = await controller.delete('123');
    expect(result).toBeUndefined();
  });

  it('debería exportar libros en CSV', async () => {
    const res = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;

    await controller.exportCsv(res);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/csv');
    expect(res.send).toHaveBeenCalledWith('csv,data\n1,test');
  });
});
