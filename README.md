## Descripción
Aplicación web backend construida con NestJS (TypeScript) que permite gestionar tareas personales por usuario autenticado, con conexión a MongoDB y autenticación mediante AWS Cognito.
Incluye funcionalidades CRUD, filtrado por estado/prioridad, y paginación

## Tecnologías
- NestJS (TypeScript)
- MongoDB Atlas
- AWS Cognito
- [AWS Lambda + API Gateway] (listo para serverless)
- JWT Strategy
- ESLint + Prettier configurado


## Funcionalidades
- Registro/Login vía AWS Cognito
- CRUD de tareas
- Filtros por estado y prioridad
- Validación de datos
- Variables de entorno configuradas

## Instalación y pruebas

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


## TODO
- Integrar autenticación con Amazon Cognito
- Agregar frontend con Next.js

