# Prisma Skill

## Uso

Usar esta guia al agregar modelos, repositories o migraciones Prisma.

## Agregar modelo nuevo

1. Crear `prisma/models/<model>.prisma`.
2. Agregar `@@schema("layer")`.
3. Ejecutar `npm run prisma:validate`.
4. Crear migracion con `npm run prisma:migrate:create` o aplicar con `npm run prisma:migrate`.
5. Ejecutar `npm run prisma:generate`.
6. Crear entity en `src/entities`.
7. Crear repository e interface en `src/repositories`.
8. Registrar repository en `src/config/container.ts`.

## Mapping

Mantener esta frontera:

```txt
Prisma model -> Repository -> Entity
```

Ejemplo:

```ts
return new Author(
  author.id,
  author.name,
  author.email,
  author.created_at,
  author.updated_at,
);
```

## Validacion

Antes de cerrar:

```bash
npm run prisma:validate
npm run prisma:generate
npm run build
npm run test:run
```