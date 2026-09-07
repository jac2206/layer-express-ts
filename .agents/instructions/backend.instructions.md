# Backend Instructions

## Reglas de capas

- Routes conectan HTTP con controllers.
- Controllers orquestan request y response.
- DTOs definen contratos de entrada/salida.
- Services implementan reglas de negocio.
- Entities representan el dominio.
- Repositories encapsulan persistencia.
- Prisma solo vive en `src/config/prisma.ts` y `src/repositories`.

## Estructura del proyecto

```txt
src/config
src/controllers
src/dto
src/entities
src/repositories
src/routes
src/services
src/types
```

## Express

- Usar `Router` para rutas.
- Montar rutas versionadas en `src/routes/v1/index.ts`.
- Mantener prefijo base `/layer` en `src/server.ts`.
- Responder JSON de forma consistente.

## Awilix

- Registrar toda clase inyectable en `src/config/container.ts`.
- Mantener nombres de registro en camelCase.
- Preferir constructor injection.
- Evitar `new` manual en controllers y services.

## DTOs

- Crear DTOs en `src/dto/<module>`.
- Usarlos para request y response shapes.
- No incluir logica de negocio dentro de DTOs.

## Entities

- Crear entities en `src/entities`.
- Mantenerlas independientes de Express y Prisma.
- Usar camelCase en TypeScript.

## Repositories

- Crear repositories en `src/repositories`.
- Crear interfaces en `src/repositories/interface`.
- Mantener Prisma dentro de repositories.
- Mapear snake_case de Prisma a camelCase de entities.

## TypeScript

- Mantener `strict`.
- Tipar interfaces publicas.
- Evitar `any` innecesario.
- Los services que hacen IO deben retornar `Promise`.