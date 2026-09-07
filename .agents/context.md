# Project Context

## Nombre

`expresstsbase`

## Proposito

Backend base en Express y TypeScript para construir servicios por capas de forma sencilla, mantenible y testeable.

## Stack actual

- Node.js
- Express 5
- TypeScript
- Awilix
- Awilix Express
- Vitest
- Supertest
- Prisma ORM
- PostgreSQL
- Dotenv

## Estructura actual

```txt
src
  config
    container.ts
    env.ts
    prisma.ts
  controllers
    health.controller.ts
    v1
      author.controller.ts
      generic.controller.ts
      post.controller.ts
  dto
    author
      create-author.dto.ts
    post
      create-post.dto.ts
  entities
    author.entity.ts
    post.entity.ts
  repositories
    author.repository.ts
    post.repository.ts
    prisma.repository.ts
    interface
      author.repository.interface.ts
      post.repository.interface.ts
      prisma.repository.interface.ts
  routes
    health.routes.ts
    v1
      author.routes.ts
      generic.routes.ts
      index.ts
      post.routes.ts
  services
    author.service.ts
    health.service.ts
    post.service.ts
    interface
      author.service.interface.ts
      health.service.interface.ts
      post.service.interface.ts
  types
    express.d.ts
```

## Prisma

```txt
prisma
  schema.prisma
  models
    author.prisma
    post.prisma
  migrations
```

El proyecto usa `prisma.config.ts` apuntando al directorio `prisma` para soportar modelos separados.

## Endpoints actuales

```txt
GET  /layer/health
GET  /layer/v1/generic
GET  /layer/v1/authors
GET  /layer/v1/authors/:id
POST /layer/v1/authors
GET  /layer/v1/posts
GET  /layer/v1/posts/:id
POST /layer/v1/posts
```

## Direccion esperada

Crecer por modulos con esta cadena:

```txt
routes -> controllers -> dto -> services -> repositories -> entities/prisma/db
```

Prisma debe mantenerse dentro de `repositories` y `config`, nunca dentro de routes o controllers.