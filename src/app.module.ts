import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { sequelizeConfig } from './config/sequelize.config';

// Modelos Sequelize
import { Usuario } from './database/models/usuario.model';
import { Libro } from './database/models/libro.model';
import { Genero } from './database/models/genero.model';
import { Editorial } from './database/models/editorial.model';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    // 🔧 Configuración global desde .env
    ConfigModule.forRoot({ isGlobal: true }),

    // 🔗 Conexión Sequelize configurada dinámicamente
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: sequelizeConfig,
    }),

    // 🧠 Registro manual de modelos si no se usa autoLoadModels
    SequelizeModule.forFeature([Usuario, Libro, Genero, Editorial]),

    AuthModule,
    BooksModule,

    // Aquí irán los módulos funcionales: AuthModule, UsersModule, etc.
  ],
})
export class AppModule {}
