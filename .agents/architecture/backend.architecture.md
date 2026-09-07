# Backend Architecture

## Vision

Este backend usa arquitectura por capas con DDD liviano. La separacion importante es mantener HTTP, negocio, dominio y persistencia en archivos distintos.

## Flujo principal

```txt
HTTP Request
  -> Route
  -> Controller
  -> DTO
  -> Service
  -> Repository
  -> Prisma
  -> Database
```

## Capas

### Routes

- Definen endpoints.
- Resuelven controllers desde Awilix.
- No contienen negocio ni Prisma.

### Controllers

- Orquestan request/response.
- Construyen DTOs de entrada desde `req.body`, `req.params` o `req.query`.
- Llaman services.
- Retornan status HTTP.

### DTO

- Definen contratos de entrada/salida.
- Viven en `src/dto/<module>`.
- No contienen persistencia ni Express.

### Services

- Contienen logica de negocio.
- Dependen de interfaces de repositories.
- No importan Express ni Prisma Client.

### Entities

- Representan dominio.
- Usan naming TypeScript, por ejemplo `createdAt`.
- Pueden tener metodos como `toPersistence()` si aportan claridad.

### Repositories

- Encapsulan Prisma.
- Mapean modelos Prisma a entities.
- Traducen diferencias de naming, por ejemplo `created_at` -> `createdAt`.

### Config

- `env.ts` carga variables.
- `prisma.ts` instancia Prisma Client.
- `container.ts` registra dependencias Awilix.

## Prisma

Prisma usa PostgreSQL con schema `layer` y modelos separados:

```txt
prisma/schema.prisma
prisma/models/author.prisma
prisma/models/post.prisma
```

`schema.prisma` habilita `multiSchema` y declara:

```prisma
datasource db {
  provider = "postgres"
  url      = env("DATABASE_URL")
  schemas  = ["layer"]
}
```

## Dependency Injection

Todas las clases inyectables deben registrarse en `src/config/container.ts`.

Patron:

```ts
container.register({
  repositoryName: asClass(RepositoryName).scoped(),
  serviceName: asClass(ServiceName).singleton(),
  controllerName: asClass(ControllerName).scoped()
});
```

## Versionado

Rutas v1:

```txt
src/routes/v1
src/controllers/v1
```

Montaje principal:

```txt
src/routes/v1/index.ts
```