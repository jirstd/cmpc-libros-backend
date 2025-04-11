# 📚 CMPC-Libros Backend

Sistema de gestión de inventario de libros para la tienda **CMPC-Libros**, desarrollado en NestJS con autenticación JWT, Sequelize, PostgreSQL y Docker. Soporta funcionalidades avanzadas como exportación CSV, soft delete, logging, y arquitectura modular.

---

## 🚀 Tecnologías

- NestJS + TypeScript
- PostgreSQL + Sequelize (ORM)
- Docker + Docker Compose
- JWT (autenticación)
- Swagger (documentación)
- Jest (tests unitarios)

---

## 🧪 Requisitos

- Node.js 18+
- Docker & Docker Compose
- Git

---

## ⚙️ Instalación local

```bash
git clone https://github.com/tuusuario/cmpc-libros-backend.git
cd cmpc-libros-backend
```

---

### 🐳 Levantar el entorno con Docker

```bash
docker-compose up --build
```

Esto levantará:
- 🗄 PostgreSQL en `localhost:5432`
- 🌐 Backend en `localhost:3000`

---

### 🔐 Variables de entorno

Las siguientes se definen en el archivo `.env`:

```env
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=cmpc_libros

JWT_SECRET=supersecreto
JWT_EXPIRES_IN=1d
```

---

## 🧪 Tests y cobertura

```bash
npm run test
npm run test -- --coverage
```

✅ Cobertura ≥ 80%

---

## 📦 Scripts útiles

```bash
# Desarrollo local sin Docker
npm install
npm run start:dev

# Ejecutar seeders manualmente
npx ts-node src/database/seeders/seed.ts
```

---

## 📘 Documentación API

Disponible automáticamente en:

```
http://localhost:3000/api
```

Incluye autenticación, CRUD completo, y exportación de libros a CSV.

---

## 🧩 Arquitectura

Modular y escalable con principios SOLID:

- `auth`: Registro, login, autenticación JWT
- `books`: CRUD de libros, exportación CSV
- `database/models`: Sequelize con UUIDs, relaciones, soft delete
- `interceptors`: Transformación global de respuestas
- `filters`: Manejo centralizado de errores

---

## 🗃 Diagrama relacional

Puedes visualizarlo o editarlo desde [dbdiagram.io](https://dbdiagram.io):

```plaintext
Table usuarios {
  id UUID [pk]
  nombre string
  email string [unique]
  password_hash string
}

Table libros {
  id UUID [pk]
  titulo string
  autor string
  precio float
  disponible boolean
  genero_id UUID [ref: > generos.id]
  editorial_id UUID [ref: > editoriales.id]
  deleted_at datetime
}

Table generos {
  id UUID [pk]
  nombre string
}

Table editoriales {
  id UUID [pk]
  nombre string
}
```

---

## 🔐 Seguridad

- JWT con expiración configurable
- Validación de input vía `class-validator`
- Guards, interceptors y filtros globales

---

## 📈 Futuras mejoras

- Dashboard estadístico
- Filtros y paginación avanzada
- Gestión de stock e historial
- Frontend administrativo con Angular o React

---

## 🧑‍💻 Autor

Desarrollado por el equipo CMPC-dev con ❤️  
Contacto: tuemail@cmpc.cl
