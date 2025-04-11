import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';
import { Genero } from './genero.model';
import { Editorial } from './editorial.model';

export interface LibroCreationAttrs {
  titulo: string;
  autor: string;
  genero_id: string;
  editorial_id: string;
  precio: number;
  disponible: boolean;
}

@Table({ tableName: 'libros', timestamps: true, paranoid: true })
export class Libro extends Model<Libro, LibroCreationAttrs> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({ type: DataType.UUID })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  titulo: string;

  @Column({ type: DataType.STRING, allowNull: false })
  autor: string;

  @ForeignKey(() => Editorial)
  @Column({ type: DataType.UUID })
  editorial_id: string;

  @ForeignKey(() => Genero)
  @Column({ type: DataType.UUID })
  genero_id: string;

  @BelongsTo(() => Editorial)
  editorial: Editorial;

  @BelongsTo(() => Genero)
  genero: Genero;

  @Column({ type: DataType.DECIMAL(10, 2), allowNull: false })
  precio: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  disponible: boolean;

  @Column({ type: DataType.DATE })
  deleted_at: Date;
}
