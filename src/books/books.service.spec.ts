import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getModelToken } from '@nestjs/sequelize';
import { Libro } from '../database/models/libro.model';

describe('BooksService', () => {
  let service: BooksService;
  let libroModel: {
    findAll: jest.Mock;
    findByPk: jest.Mock;
    create: jest.Mock;
    update: jest.Mock;
  };

  beforeEach(async () => {
    libroModel = {
      findAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Libro),
          useValue: libroModel,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('debería retornar todos los libros activos', async () => {
    libroModel.findAll.mockResolvedValue([
      { titulo: 'Libro 1' },
      { titulo: 'Libro 2' },
    ]);

    const result = await service.findAll();
    expect(result).toHaveLength(2);
    expect(libroModel.findAll).toHaveBeenCalled();
  });

  it('debería lanzar error si no encuentra un libro', async () => {
    libroModel.findByPk.mockResolvedValue(null);

    await expect(service.findOne('123')).rejects.toThrow('Libro no encontrado');
  });

  it('debería crear un libro correctamente', async () => {
    const data = { titulo: 'Nuevo libro' };
    libroModel.create.mockResolvedValue(data);

    const result = await service.create(data as any);
    expect(result.titulo).toBe('Nuevo libro');
  });
});
