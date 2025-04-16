import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Genero } from '../database/models/genero.model';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genero)
    private genreModel: typeof Genero,
  ) {}

  findAll() {
    return this.genreModel.findAll();
  }
}
