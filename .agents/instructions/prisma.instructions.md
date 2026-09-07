# Prisma Instructions

## Estado actual

El proyecto usa Prisma 6 con PostgreSQL y schema `layer`.

Archivos principales:

```txt
prisma.config.ts
prisma/schema.prisma
prisma/models/author.prisma
prisma/models/post.prisma
src/config/prisma.ts
src/repositories/prisma.repository.ts
```

## Configuracion

`prisma.config.ts` carga `dotenv` y define el schema como directorio:

```ts
export default defineConfig({
  schema: path.join("prisma"),
});
```

Esto permite separar modelos en `prisma/models`.

## Variables

`DATABASE_URL` debe existir en `.env`.

Ejemplo:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/layer_db?schema=layer"
```

## Comandos

```bash
npm run prisma:validate
npm run prisma:generate
npm run prisma:migrate
npm run prisma:migrate:create
npm run prisma:deploy
npm run prisma:status
npm run prisma:studio
```

## Reglas

- No importar Prisma Client en controllers.
- No importar Prisma Client en services.
- Usar Prisma Client solo en repositories o `src/config/prisma.ts`.
- Cada modelo nuevo debe ir en `prisma/models/<model>.prisma`.
- Usar `@@schema("layer")` en modelos persistidos.
- Usar `@@map` cuando el nombre de tabla sea plural o snake_case.
- Si Prisma usa `created_at`, el repository debe mapear a `createdAt` en entity.