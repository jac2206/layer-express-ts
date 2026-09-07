# 🧱 Layer Express TS Chasis

## 🚀 Express 5 + TypeScript + Prisma + PostgreSQL + Awilix + Zod + Swagger + JWT + Winston + Biome + Husky + Commitlint

Backend base profesional construido con:

* Node.js
* Express 5
* TypeScript
* Arquitectura por capas
* Prisma ORM
* PostgreSQL
* Awilix (Inyección de dependencias)
* Zod (Validación)
* Swagger / OpenAPI
* JWT (Autenticación)
* Winston (Logging estructurado)
* Biome (Formatting + Linting)
* Husky (Git Hooks)
* Commitlint (Conventional Commits)
* Dotenv (Variables de entorno)
* Middleware global de errores

---

# 🧠 1. Arquitectura

Este proyecto implementa una **arquitectura por capas**, separando las responsabilidades principales de la aplicación.

La comunicación entre capas sigue el siguiente flujo:

```text
HTTP Request
     ↓
   Routes
     ↓
 Middlewares
     ↓
 Controller
     ↓
  Service
     ↓
 Repository
     ↓
  Prisma
     ↓
 PostgreSQL
```

### 📌 Regla principal

Cada capa debe encargarse de una responsabilidad específica y evitar conocer detalles innecesarios de las demás capas.

---

# 🧱 2. Capas del Proyecto

## 🟢 2.1 Entities

Las Entities representan los objetos principales del dominio de la aplicación.

Ejemplo:

```ts
export class Author {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  toPersistence() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
```

Las entidades no dependen de Express ni de Prisma.

---

## 🔵 2.2 DTOs

Los DTOs representan los datos que entran y salen de la aplicación.

Se separan los DTOs de entrada de los DTOs de respuesta.

### Request DTO

```ts
export interface CreateAuthorDto {
  name: string;
  email: string;
}
```

### Response DTO

```ts
export interface AuthorResponseDto {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
```

Esto evita exponer directamente las Entities a través de la API.

El flujo es:

```text
Request DTO
     ↓
   Service
     ↓
   Entity
     ↓
Response DTO
     ↓
 Controller
     ↓
   JSON
```

---

## 🟡 2.3 Services

Los Services contienen la lógica de aplicación.

Se encargan de:

* Coordinar operaciones.
* Aplicar reglas de negocio.
* Transformar Entities a Response DTOs.
* Manejar errores de aplicación.

Ejemplo:

```ts
async getById(id: string): Promise<AuthorResponseDto> {
  const author = await this.authorRepository.findById(id);

  if (!author) {
    const error = DomainErrors.AUTHOR_NOT_FOUND;

    throw new DomainException(
      error.code,
      error.message,
      error.statusCode,
    );
  }

  return {
    id: author.id,
    name: author.name,
    email: author.email,
    createdAt: author.createdAt,
  };
}
```

El Service no conoce Express ni recibe objetos `Request` o `Response`.

---

## 🟠 2.4 Repositories

Los Repositories se encargan de la persistencia.

El Service depende de una interfaz:

```ts
export interface IAuthorRepository {
  findAll(): Promise<Author[]>;
  findById(id: string): Promise<Author | null>;
  create(data: CreateAuthorDto): Promise<Author>;
}
```

La implementación concreta utiliza Prisma:

```ts
export class AuthorRepository implements IAuthorRepository {
  constructor(
    private readonly prismaClient: PrismaClient,
  ) {}

  async findById(id: string): Promise<Author | null> {
    const author = await this.prismaClient.author.findUnique({
      where: { id },
    });

    if (!author) {
      return null;
    }

    return new Author(
      author.id,
      author.name,
      author.email,
      author.created_at,
      author.updated_at,
    );
  }
}
```

La responsabilidad queda separada:

```text
Service
   ↓
IAuthorRepository
   ↓
AuthorRepository
   ↓
Prisma
   ↓
PostgreSQL
```

---

## 🟣 2.5 Controllers

Los Controllers manejan la comunicación HTTP.

Se encargan de:

* Recibir `Request`.
* Llamar al Service.
* Definir el status HTTP.
* Enviar el Response DTO.

Ejemplo:

```ts
export class AuthorController {
  constructor(
    private readonly authorService: IAuthorService,
  ) {}

  getById = async (
    req: Request,
    res: Response<AuthorResponseDto>,
  ): Promise<void> => {
    const result = await this.authorService.getById(req.params.id);

    res.status(200).json(result);
  };
}
```

El Controller no contiene lógica de negocio.

---

# 🗄️ 3. Prisma + PostgreSQL

El proyecto utiliza **Prisma ORM** para trabajar con PostgreSQL.

Prisma se encarga de:

* Conexión con PostgreSQL.
* Generación del cliente.
* Consultas.
* Migraciones.
* Sincronización del esquema.
* Tipado de las operaciones de base de datos.

---

## 📦 Instalación

```bash
npm install prisma @prisma/client
```

Inicializar Prisma:

```bash
npx prisma init
```

Esto genera:

```text
prisma/
├── schema.prisma
└── migrations/

prisma.config.ts
```

---

## ⚙️ Configuración de PostgreSQL

La conexión se configura mediante variables de entorno.

### `.env`

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/layer_db"
```

El proyecto utiliza PostgreSQL como base de datos principal.

---

## 📄 Prisma Schema

Archivo:

```text
prisma/schema.prisma
```

Ejemplo:

```prisma
model Author {
  id         String   @id @default(uuid())
  name       String
  email      String   @unique
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  posts Post[]

  @@map("authors")
  @@schema("layer")
}

model Post {
  id         String   @id @default(uuid())
  title      String
  content    String?
  published  Boolean  @default(false)
  authorId   String
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt

  author Author @relation(fields: [authorId], references: [id])

  @@map("posts")
  @@schema("layer")
}
```

La relación utilizada es:

```text
Author
  │
  │ 1:N
  ↓
Post
```

Un Author puede tener múltiples Posts.

---

# 🔄 4. Prisma Migrations

Prisma utiliza migraciones para controlar los cambios realizados en la estructura de la base de datos.

## Crear una migración

Cuando se modifica `schema.prisma`:

```bash
npm run prisma:migrate -- --name add_author_phone
```

Esto:

1. Detecta los cambios.
2. Genera una migración.
3. Aplica la migración a la base de datos.
4. Registra el cambio dentro de `prisma/migrations`.

---

## 🔍 Ver estado de las migraciones

```bash
npm run prisma:status
```

Permite verificar:

* Migraciones aplicadas.
* Migraciones pendientes.
* Migraciones con problemas.

---

## ♻️ Reset de la base de datos

Para desarrollo local:

```bash
npm run prisma:reset
```

Este comando elimina los datos de la base de datos y vuelve a ejecutar las migraciones.

> ⚠️ No utilizar en producción.

---

## 🚀 Aplicar migraciones en producción

```bash
npm run prisma:deploy
```

Este comando aplica las migraciones pendientes sin crear nuevas.

Es el comando recomendado para ambientes como:

```text
Development
Staging
Production
Railway
```

---

## 🧬 Generar Prisma Client

```bash
npx prisma generate
```

Este comando genera el cliente utilizado por los Repositories.

---

## 🔎 Prisma Studio

Para visualizar y administrar los datos:

```bash
npx prisma studio
```

Prisma Studio permite consultar las tablas y registros mediante una interfaz gráfica.

---

# 🧩 5. Inyección de Dependencias – Awilix

El proyecto utiliza **Awilix** para manejar la inyección de dependencias.

Instalación:

```bash
npm install awilix awilix-express
```

Las dependencias principales se registran en:

```text
src/config/container.ts
```

Ejemplo:

```ts
container.register({
  prismaClient: asFunction(() => prisma).singleton(),

  authorRepository: asClass(AuthorRepository).singleton(),
  postRepository: asClass(PostRepository).singleton(),

  authorService: asClass(AuthorService).singleton(),
  postService: asClass(PostService).singleton(),

  authorController: asClass(AuthorController).singleton(),
  postController: asClass(PostController).singleton(),
});
```

El flujo de dependencias es:

```text
Controller
    ↓
 Service
    ↓
Repository
    ↓
 Prisma
```

Awilix se encarga de resolver las implementaciones.

---

# 🔐 6. Security – JWT

El proyecto incluye autenticación mediante JWT.

La seguridad está separada en su propia capa:

```text
src/security/
├── jwt-auth.service.ts
└── jwt-payload.interface.ts
```

---

## JWT Payload

```ts
export interface JwtPayload {
  sub: string;
  username?: string;
  email?: string;
  client_id?: string;
  type: "access" | "refresh";
  scopes?: string[];
  iss?: string;
  aud?: string;
  iat?: number;
  exp?: number;
}
```

---

## Generación del Token

```ts
generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, env.jwtSecret, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
}
```

---

## Verificación del Token

```ts
verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, env.jwtSecret, {
    algorithms: ["HS256"],
  }) as JwtPayload;

  if (decoded.type !== "access") {
    throw new Error("Invalid token type");
  }

  return decoded;
}
```

---

## Middleware de autenticación

Archivo:

```text
src/middlewares/authenticate-jwt.middleware.ts
```

El middleware obtiene el token desde:

```text
Authorization: Bearer <token>
```

Flujo:

```text
HTTP Request
     ↓
Authorization Header
     ↓
authenticateJWT
     ↓
JwtAuthService
     ↓
verifyToken()
     ↓
Controller
```

Si el token es inválido o está expirado:

```json
{
  "code": "INVALID_TOKEN",
  "message": "Token invalid or expired"
}
```

Respuesta:

```text
401 Unauthorized
```

---

# ⚠️ 7. Manejo Global de Errores

El proyecto utiliza un middleware global para centralizar el manejo de errores.

Archivo:

```text
src/middlewares/error.middleware.ts
```

Ejemplo:

```ts
export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (
    err instanceof SyntaxError &&
    "body" in err
  ) {
    logger.warn({
      code: "INVALID_JSON",
      message: "Invalid JSON body",
    });

    res.status(400).json({
      code: "INVALID_JSON",
      message: "Invalid JSON body",
    });

    return;
  }

  if (err instanceof DomainException) {
    logger.warn({
      code: err.code,
      message: err.message,
    });

    res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });

    return;
  }

  logger.error(err);

  res.status(500).json({
    code: "INTERNAL_SERVER_ERROR",
    message: "Internal Server Error",
  });
};
```

Registrar en `server.ts`:

```ts
app.use(errorMiddleware);
```

---

## Errores de dominio

Archivo:

```text
src/errors/domain.errors.ts
```

Ejemplo:

```ts
export const DomainErrors = {
  AUTHOR_NOT_FOUND: {
    code: "AUTHOR_NOT_FOUND",
    message: "Author not found",
    statusCode: 404,
  },

  AUTHOR_EMAIL_ALREADY_EXISTS: {
    code: "AUTHOR_EMAIL_ALREADY_EXISTS",
    message: "Author email already exists",
    statusCode: 409,
  },

  POST_NOT_FOUND: {
    code: "POST_NOT_FOUND",
    message: "Post not found",
    statusCode: 404,
  },
};
```

---

## DomainException

```ts
export class DomainException extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
```

---

# 🪵 8. Logger con Winston

El proyecto utiliza Winston para logging estructurado.

Archivo:

```text
src/config/logger.ts
```

```ts
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});
```

Ejemplo:

```ts
logger.info("Server started");

logger.warn({
  code: "AUTHOR_EMAIL_ALREADY_EXISTS",
  message: "Author email already exists",
});

logger.error(error);
```

---

# 🧪 9. Validación con Zod

El proyecto utiliza Zod para validar los datos recibidos por HTTP.

Ejemplo:

```ts
export const createAuthorSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});
```

La validación se realiza mediante middleware.

```text
Request
   ↓
Validate Middleware
   ↓
Zod Schema
   ↓
Controller
```

Los schemas también se utilizan para generar la documentación OpenAPI.

---

# 📖 10. Swagger / OpenAPI

El proyecto utiliza:

```text
@asteasolutions/zod-to-openapi
swagger-ui-express
```

Swagger permite documentar y probar los endpoints.

Documentación disponible en:

```text
http://localhost:3000/docs
```

El API utiliza el prefijo:

```text
/layer
```

y versionado:

```text
/v1
```

Por ejemplo:

```text
http://localhost:3000/layer/v1/authors
```

---

## 🔒 Swagger + JWT

Las rutas protegidas pueden indicar:

```ts
isProtected: true
```

Esto permite documentar automáticamente el esquema:

```text
Authorization: Bearer <token>
```

Swagger mostrará la opción:

```text
🔒 Authorize
```

---

# 🌎 11. Variables de Entorno

Las variables de entorno se manejan mediante `.env`.

### `.env`

```env
PORT=3000

NODE_ENV=development

SHOW_ENV=true

APP_NAME=Layer API

APP_VERSION=1.0.0

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/layer_db"

JWT_SECRET=your-secret-key

LOG_LEVEL=info
```

Las variables sensibles no deben almacenarse directamente en el código fuente.

---

# 🚀 12. Instalación y Ejecución

## Clonar repositorio

```bash
git clone https://github.com/tu-usuario/layer-express-ts.git

cd layer-express-ts
```

## Instalar dependencias

```bash
npm install
```

## Configurar variables de entorno

Crear:

```text
.env
```

y configurar:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/layer_db"
JWT_SECRET=your-secret-key
```

---

## Ejecutar Prisma

Generar el cliente:

```bash
npx prisma generate
```

Aplicar las migraciones:

```bash
npm run prisma:migrate
```

---

## Ejecutar en desarrollo

```bash
npm run dev
```

Servidor:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/docs
```

---

# 📦 13. Scripts de Prisma

Scripts principales:

```bash
npm run prisma:migrate
```

Crear y aplicar migraciones durante desarrollo.

```bash
npm run prisma:status
```

Consultar el estado de las migraciones.

```bash
npm run prisma:reset
```

Resetear la base de datos local.

```bash
npm run prisma:deploy
```

Aplicar migraciones pendientes en producción.

```bash
npx prisma generate
```

Generar Prisma Client.

```bash
npx prisma studio
```

Abrir Prisma Studio.

---

# 🏗️ 14. Compilación

Compilar el proyecto:

```bash
npm run build
```

Ejecutar la versión compilada:

```bash
npm start
```

---

# 🎨 15. Formateo y Calidad de Código con Biome

Este proyecto utiliza **Biome** para mantener un estándar consistente de formato y calidad.

Biome se utiliza para:

* Formatear código.
* Ejecutar linting.
* Organizar imports.
* Mantener reglas recomendadas para JavaScript y TypeScript.

Biome reemplaza la necesidad de utilizar:

```text
Prettier + ESLint
```

---

## 📦 Instalación

```bash
npm install -D @biomejs/biome
```

Inicializar:

```bash
npx @biomejs/biome init
```

Esto genera:

```text
biome.json
```

---

## 🧹 Formatear código

```bash
npm run format
```

Ejemplo de script:

```json
{
  "format": "biome format --write ."
}
```

---

## 🔍 Validar código

```bash
npm run check
```

Ejemplo:

```json
{
  "check": "biome check ."
}
```

---

# 🪝 16. Git Hooks con Husky

El proyecto utiliza Husky para automatizar validaciones durante los commits.

Instalación:

```bash
npm install -D husky
```

Inicializar:

```bash
npx husky init
```

Estructura:

```text
.husky/
├── pre-commit
└── commit-msg
```

---

## 🔍 Pre-commit

Archivo:

```text
.husky/pre-commit
```

Contenido:

```sh
#!/usr/bin/env sh

npm run format
npm run check
```

Cada vez que se ejecuta:

```bash
git commit
```

Husky ejecutará las validaciones configuradas.

---

# 📝 17. Conventional Commits con Commitlint

El proyecto utiliza Commitlint para garantizar que los commits sigan el estándar **Conventional Commits**.

---

## 📦 Instalación

```bash
npm install -D @commitlint/cli @commitlint/config-conventional
```

---

## ⚙️ Configuración

Archivo:

```text
.commitlintrc.json
```

Contenido:

```json
{
  "extends": ["@commitlint/config-conventional"]
}
```

---

## 🪝 Commit-msg

Archivo:

```text
.husky/commit-msg
```

Contenido:

```sh
#!/usr/bin/env sh

npx --no -- commitlint --edit "$1"
```

---

## ✅ Commits válidos

```bash
git commit -m "feat: add author module"

git commit -m "fix: resolve author validation"

git commit -m "refactor: improve repository"

git commit -m "test: add author service tests"

git commit -m "docs: update readme"

git commit -m "chore: update dependencies"
```

---

## ❌ Commits inválidos

```bash
git commit -m "crear author"

git commit -m "feat add author"

git commit -m "feat : add author"
```

Formato correcto:

```text
type: description
```

Ejemplo:

```text
feat: add author module
```

---

# 🔄 18. Flujo Completo de Git

Al ejecutar:

```bash
git commit -m "feat: add post module"
```

se ejecuta:

```text
                  git commit
                       ↓
              ┌────────────────┐
              │   pre-commit   │
              └───────┬────────┘
                      ↓
               npm run format
                      ↓
                npm run check
                      ↓
                    Biome
                      ↓
              ┌────────────────┐
              │   commit-msg   │
              └───────┬────────┘
                      ↓
                 Commitlint
                      ↓
            Conventional Commits
                      ↓
                  ✅ Commit
```

Si Biome encuentra errores o Commitlint detecta un mensaje inválido:

```text
❌ Commit detenido
```

---

# 🧪 19. Testing con Vitest

El proyecto utiliza Vitest para pruebas unitarias y de integración.

Instalación:

```bash
npm install -D vitest @vitest/coverage-v8 supertest
```

Ejecutar pruebas:

```bash
npm run test
```

Coverage:

```bash
npm run test:coverage
```

La arquitectura por capas permite probar los Services y otras piezas sin depender directamente de Express o PostgreSQL.

Ejemplo conceptual:

```text
Service
   ↓
Mock Repository
   ↓
Test
```

Esto permite probar la lógica de aplicación de manera aislada.

---

# 📂 20. Estructura del Proyecto

```text
src
├── config
│   ├── container.ts
│   ├── env.ts
│   ├── logger.ts
│   └── prisma.ts
│
├── controllers
│   ├── health.controller.ts
│   └── v1
│       ├── author.controller.ts
│       └── post.controller.ts
│
├── docs
│   ├── registry.ts
│   ├── route-builder.ts
│   └── swagger.ts
│
├── dto
│   ├── author
│   │   ├── author-response.dto.ts
│   │   └── create-author.dto.ts
│   └── post
│       ├── create-post.dto.ts
│       └── post-response.dto.ts
│
├── entities
│   ├── author.entity.ts
│   └── post.entity.ts
│
├── errors
│   ├── domain.exception.ts
│   ├── domain.errors.ts
│   └── prisma.error.ts
│
├── middlewares
│   ├── authenticate-jwt.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
│
├── repositories
│   ├── interface
│   │   ├── author.repository.interface.ts
│   │   ├── post.repository.interface.ts
│   │   └── prisma.repository.interface.ts
│   ├── author.repository.ts
│   ├── post.repository.ts
│   └── prisma.repository.ts
│
├── routes
│   ├── health.routes.ts
│   └── v1
│       ├── author.routes.ts
│       ├── post.routes.ts
│       └── index.ts
│
├── schemas
│   ├── author.schema.ts
│   ├── error.schema.ts
│   └── post.schema.ts
│
├── security
│   ├── jwt-auth.service.ts
│   └── jwt-payload.interface.ts
│
├── services
│   ├── interface
│   │   ├── author.service.interface.ts
│   │   ├── auth.service.interface.ts
│   │   ├── health.service.interface.ts
│   │   └── post.service.interface.ts
│   ├── author.service.ts
│   ├── health.service.ts
│   └── post.service.ts
│
├── main.ts
└── server.ts
```

---

# 🗄️ 21. Estructura de Prisma

```text
prisma
├── migrations
│   └── ...
└── schema.prisma

prisma.config.ts
```

Las migraciones deben mantenerse versionadas en Git.

```text
prisma/
└── migrations/
    ├── 2026..._initial/
    └── 2026..._add_...
```

No se deben eliminar migraciones existentes para solucionar cambios de esquema.

---

# 📡 22. Endpoints

Actualmente el chasis contiene ejemplos para:

## Health

```text
GET /layer/health
```

## Authors

```text
GET  /layer/v1/authors
GET  /layer/v1/authors/:id
POST /layer/v1/authors
```

## Posts

```text
GET  /layer/v1/posts
GET  /layer/v1/posts/:id
POST /layer/v1/posts
```

Los endpoints protegidos pueden utilizar:

```text
Authorization: Bearer <JWT>
```

---

# 🧠 23. Principios Aplicados

* Separation of Concerns
* Single Responsibility
* Dependency Injection
* Dependency Inversion
* Repository Pattern
* DTO Pattern
* Layered Architecture
* Validación de entrada
* Manejo centralizado de errores
* Logging estructurado
* Autenticación mediante JWT
* Documentación OpenAPI
* Migraciones controladas
* Formateo y linting automatizado
* Conventional Commits
* Git Hooks automatizados
* Testing
* Tipado estático con TypeScript

---

# 🏁 24. Conclusión

Este chasis permite iniciar rápidamente nuevas APIs utilizando una estructura organizada y reutilizable.

Incluye:

* Express + TypeScript
* Arquitectura por capas
* Prisma + PostgreSQL
* Repository Pattern
* Awilix
* DTOs de entrada y salida
* Zod
* Swagger / OpenAPI
* JWT
* Winston
* Manejo global de errores
* Vitest
* Biome
* Husky
* Commitlint
* Prisma Migrations

La estructura permite agregar nuevos módulos siguiendo el mismo patrón:

```text
DTO
 ↓
Schema
 ↓
Route
 ↓
Controller
 ↓
Service
 ↓
Repository Interface
 ↓
Repository
 ↓
Entity
 ↓
Prisma
 ↓
PostgreSQL
```

---

> **Routes** reciben y organizan las peticiones.

> **Middlewares** manejan preocupaciones HTTP transversales.

> **Controllers** manejan HTTP.

> **Services** contienen la lógica de aplicación.

> **Repositories** manejan la persistencia.

> **Entities** representan el dominio.

> **DTOs** controlan los datos de entrada y salida.

> **Prisma** comunica la aplicación con PostgreSQL.

> **JWT** protege los recursos.

> **Winston** centraliza el logging.

> **Biome** mantiene la calidad y consistencia del código.

> **Husky** automatiza validaciones mediante Git Hooks.

> **Commitlint** garantiza Conventional Commits.
