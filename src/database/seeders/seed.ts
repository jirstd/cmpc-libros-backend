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
      imagen: '/uploads/libros/el-principito.jpg',
    },
    {
      titulo: 'Breves respuestas a las grandes preguntas',
      autor: 'Stephen Hawking',
      genero_id: generos[1].id,
      editorial_id: editoriales[1].id,
      precio: 14900,
      disponible: true,
      imagen: '/uploads/libros/hawking.jpg',
    },
    {
      titulo: 'Sapiens',
      autor: 'Yuval Noah Harari',
      genero_id: generos[2].id,
      editorial_id: editoriales[2].id,
      precio: 12900,
      disponible: false,
      imagen: '/uploads/libros/sapiens.jpg',
    },
    {
      titulo: 'Nuestro Lugar En El Mundo',
      autor: 'Inma Rubiales',
      genero_id: generos[1].id,
      editorial_id: editoriales[0].id,
      precio: 19900,
      disponible: true,
      imagen: '/uploads/libros/nuestro-lugar.jpg',
    },
    {
      titulo: 'Sorprende A Tu Mente',
      autor: 'Ana Ibañez',
      genero_id: generos[0].id,
      editorial_id: editoriales[0].id,
      precio: 18890,
      disponible: true,
      imagen: '/uploads/libros/sorprende.jpg',
    },
    {
      titulo: 'La Isla Maldita',
      autor: 'Adrian Mckinty',
      genero_id: generos[2].id,
      editorial_id: editoriales[0].id,
      precio: 22990,
      disponible: true,
      imagen: '/uploads/libros/la-isla-maldita.jpg',
    },
    {
      titulo: 'El Adversario',
      autor: 'Enmanuel Carrère',
      genero_id: generos[1].id,
      editorial_id: editoriales[2].id,
      precio: 11990,
      disponible: true,
      imagen: '/uploads/libros/el-adversario.jpg',
    },
    {
      titulo: 'El Estilo Del Mundo La Vida',
      autor: 'Vicente Verdú',
      genero_id: generos[0].id,
      editorial_id: editoriales[2].id,
      precio: 18480,
      disponible: true,
      imagen: '/uploads/libros/estilo-del-mundo.jpg',
    },
    {
      titulo: 'Fiebre en las Gradas',
      autor: 'Nick Hornby',
      genero_id: generos[2].id,
      editorial_id: editoriales[2].id,
      precio: 22790,
      disponible: true,
      imagen: '/uploads/libros/fiebre-gradas.jpg',
    },
    {
      titulo: 'Extraños en un Tren',
      autor: 'Patricia Highsmith',
      genero_id: generos[2].id,
      editorial_id: editoriales[1].id,
      precio: 10900,
      disponible: false,
      imagen: '/uploads/libros/extranos-tren.jpg',
    },
    {
      titulo: 'El Danubio',
      autor: 'Claudio Magris',
      genero_id: generos[1].id,
      editorial_id: editoriales[1].id,
      precio: 22900,
      disponible: true,
      imagen: '/uploads/libros/el-danubio.jpg',
    },
    {
      titulo: 'La canción del verdugo',
      autor: 'Norman Mailer',
      genero_id: generos[0].id,
      editorial_id: editoriales[1].id,
      precio: 31900,
      disponible: false,
      imagen: '/uploads/libros/cancion-verdugo.jpg',
    },
    {
      titulo: 'Una Cuestión Personal',
      autor: 'Kenzaburo Oe',
      genero_id: generos[1].id,
      editorial_id: editoriales[1].id,
      precio: 29800,
      disponible: true,
      imagen: '/uploads/libros/cuestion-personal.jpg',
    },
  ] as Libro[]);
}
