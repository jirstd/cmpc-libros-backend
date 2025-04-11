import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';

import { Usuario } from '../database/models/usuario.model';
import { Libro } from '../database/models/libro.model';
import { Genero } from '../database/models/genero.model';
import { Editorial } from '../database/models/editorial.model';

export const sequelizeConfig = (
  configService: ConfigService,
): SequelizeModuleOptions => ({
  dialect: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: Number(configService.get<string>('DB_PORT') || 5432),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  autoLoadModels: true,
  synchronize: true,
  logging: false,

  // ✅ Aquí colocamos los modelos registrados
  models: [Usuario, Libro, Genero, Editorial],
});
