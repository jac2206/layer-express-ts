# AGENTS.md

Guia raiz para agentes que trabajen en este backend.

## Lectura obligatoria

Antes de modificar codigo, leer:

1. [context.md](context.md)
2. [architecture/backend.architecture.md](architecture/backend.architecture.md)
3. [architecture/backend.patterns.md](architecture/backend.patterns.md)
4. [instructions/ai-agents.instructions.md](instructions/ai-agents.instructions.md)
5. [instructions/backend.instructions.md](instructions/backend.instructions.md)
6. [instructions/prisma.instructions.md](instructions/prisma.instructions.md)
7. [testing/strategy.md](testing/strategy.md)

Leer documentos adicionales segun el trabajo:

- Swagger/API docs: [instructions/swagger.instructions.md](instructions/swagger.instructions.md) y [skills/swagger.skill.md](skills/swagger.skill.md)
- Express/Node: [skills/express-node.skill.md](skills/express-node.skill.md)
- Prisma: [skills/prisma.skill.md](skills/prisma.skill.md)
- Vitest: [skills/vitest.skill.md](skills/vitest.skill.md)
- Specs: [specs/README.md](specs/README.md) y [specs/spec.template.md](specs/spec.template.md)

## Contexto rapido

Backend en TypeScript con Express, arquitectura por capas, Awilix, Vitest y Prisma.

Estructura esperada:

```txt
src
  config
  controllers
  dto
  entities
  repositories
  routes
  services
  types
```

Flujo esperado:

```txt
Route -> Controller -> DTO -> Service -> Repository -> Prisma -> Database
```

## Reglas base

- No poner logica de negocio en routes.
- No usar `Request` o `Response` dentro de services, repositories, DTOs o entities.
- No usar Prisma directo en routes o controllers.
- Usar `dto` para contratos de entrada/salida.
- Usar `entities` para modelos de dominio.
- Usar `repositories` para persistencia y mapeo Prisma -> entity.
- Registrar clases inyectables en `src/config/container.ts`.
- Mantener cambios pequenos, claros y testeables.
- No revertir cambios ajenos.

## Comandos utiles

```bash
npm install
npm run dev
npm run build
npm run test:run
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```