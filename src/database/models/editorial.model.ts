import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  HasMany,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Libro } from './libro.model';

@Table({ tableName: 'editoriales', timestamps: false })
export class Editorial extends Model<Editorial> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataType.UUID })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  nombre: string;

  @HasMany(() => Libro)
  libros: Libro[];
}
