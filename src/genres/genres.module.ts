import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genero } from '../database/models/genero.model';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';

@Module({
  imports: [SequelizeModule.forFeature([Genero])],
  providers: [GenresService],
  controllers: [GenresController],
  exports: [GenresService],
})
export class GenresModule {}
