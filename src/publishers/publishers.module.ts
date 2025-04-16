import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Editorial } from '../database/models/editorial.model';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';

@Module({
  imports: [SequelizeModule.forFeature([Editorial])],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublishersModule {}
