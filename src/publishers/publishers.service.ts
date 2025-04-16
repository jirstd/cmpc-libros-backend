import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Editorial } from '../database/models/editorial.model';

@Injectable()
export class PublishersService {
  constructor(
    @InjectModel(Editorial)
    private publisherModel: typeof Editorial,
  ) {}

  async findAll() {
    return this.publisherModel.findAll();
  }
}
