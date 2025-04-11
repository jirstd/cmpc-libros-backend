import { Sequelize } from 'sequelize-typescript';
import { Usuario } from '../models/usuario.model';
import { Libro } from '../models/libro.model';
import { Genero } from '../models/genero.model';
import { Editorial } from '../models/editorial.model';
import * as bcrypt from 'bcryptjs';

export async function runSeed(sequelize: Sequelize) {
  await sequelize.sync({ force: true }); // ⚠️ Solo para desarrollo

  const passwordHash = await bcrypt.hash('admin123', 10);

  const user = await Usuario.create({
    nombre: 'Admin',
    email: 'admin@cmpc.com',
    password_hash: passwordHash,
  } as Usuario); // <-- solución tipado

  const generos = await Genero.bulkCreate([
    { nombre: 'Ficción' },
    { nombre: 'Ciencia' },
    { nombre: 'Historia' },
  ] as Genero[]); // <-- solución tipado

  const editoriales = await Editorial.bulkCreate([
    { nombre: 'Planeta' },
    { nombre: 'Santillana' },
    { nombre: 'Anagrama' },
  ] as Editorial[]); // <-- solución tipado

  await Libro.bulkCreate([
    {
      titulo: 'El Principito',
      autor: 'Antoine de Saint-Exupéry',
      genero_id: generos[0].id,
      editorial_id: editoriales[0].id,
      precio: 9900,
      disponible: true,
    },
    {
      titulo: 'Breves respuestas a las grandes preguntas',
      autor: 'Stephen Hawking',
      genero_id: generos[1].id,
      editorial_id: editoriales[1].id,
      precio: 14900,
      disponible: true,
    },
    {
      titulo: 'Sapiens',
      autor: 'Yuval Noah Harari',
      genero_id: generos[2].id,
      editorial_id: editoriales[2].id,
      precio: 12900,
      disponible: false,
    },
  ] as Libro[]); // <-- solución tipado
}
