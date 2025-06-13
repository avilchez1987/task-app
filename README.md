# 📝 Task Manager API

## Descripción
Aplicación web backend construida con NestJS (TypeScript) que permite gestionar tareas personales por usuario autenticado, con conexión a MongoDB y autenticación mediante AWS Cognito.
Incluye funcionalidades CRUD, filtrado por estado/prioridad, y paginación

## 🚀 Tecnologías utilizadas

- [NestJS](https://nestjs.com/) – Framework backend con soporte modular
- [MongoDB](https://www.mongodb.com/) – Base de datos NoSQL
- [Mongoose](https://mongoosejs.com/) – ODM para MongoDB
- [AWS Cognito](https://aws.amazon.com/cognito/) – Autenticación y gestión de usuarios
- [JWT](https://jwt.io/) – Validación de sesión del lado del backend
- TypeScript – Tipado estático
- ESLint + Prettier – Formato y reglas de código


## 🧱 Arquitectura

- **Usuarios** se registran y autentican mediante **AWS Cognito**
- Los datos del usuario (email + cognitoId) se almacenan en MongoDB
- Las **tareas** están asociadas a un usuario (`userId`)
- Autenticación mediante token JWT incluido en cada request

## ⚙️ Instalación y configuración

1. Clona el repositorio:
   git clone https://github.com/avilchez1987/task-app.git
   cd task-app

2. Instala dependencias:
   npm install
  
3. Configura el archivo `.env`:
  MONGODB_URI=mongodb+srv://<usuario>:<pass>@cluster.mongodb.net/<db>

4. Inicia el servidor:
  npm run start:dev


## Endpoints principales

| Método | Ruta        | Descripción               | Autenticado |
| ------ | ----------- | ------------------------- | ----------- |
| POST   | /tasks      | Crear nueva tarea         | ✅           |
| GET    | /tasks      | Listar tareas del usuario | ✅           |
| GET    | /tasks/\:id | Obtener detalle de tarea  | ✅           |
| PUT    | /tasks/\:id | Editar tarea existente    | ✅           |
| DELETE | /tasks/\:id | Eliminar tarea            | ✅           |


