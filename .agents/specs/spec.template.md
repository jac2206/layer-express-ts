# Spec Template

## Metadata

- Status: draft
- Owner: backend
- Created:
- Updated:

## Problema

Describir que se quiere resolver y por que importa.

## Objetivo

Describir el resultado esperado.

## API Contract

### Endpoint

```txt
METHOD /layer/v1/resource
```

### Request DTO

```json
{}
```

### Response

```json
{}
```

### Errores

```json
{
  "message": "Error message",
  "code": 400
}
```

## Arquitectura

Capas afectadas:

- Routes:
- Controllers:
- DTOs:
- Services:
- Entities:
- Repositories:
- Prisma models:
- Migrations:

## Modelo Prisma

Archivo esperado:

```txt
prisma/models/example.prisma
```

```prisma
model Example {
  id         String    @id @default(uuid())
  created_at DateTime  @default(now())
  updated_at DateTime? @updatedAt

  @@map("examples")
  @@schema("layer")
}
```

## Entity

Archivo esperado:

```txt
src/entities/example.entity.ts
```

## Reglas de negocio

- 

## Pruebas

Unitarias:

- 

Integracion:

- 

## Checklist

- [ ] Contrato definido en DTOs.
- [ ] Entity definida si aplica.
- [ ] Repository definido si hay persistencia.
- [ ] Modelo Prisma definido si hay DB.
- [ ] Migracion creada si aplica.
- [ ] `npm run prisma:validate` pasa.
- [ ] `npm run build` pasa.
- [ ] `npm run test:run` pasa.