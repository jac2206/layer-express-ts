# Auth Spec

## Metadata

- Status: draft
- Owner: backend
- Created:
- Updated:

## Problema

El backend aun no tiene autenticacion. Si se agregan recursos privados, sera necesario identificar usuarios y proteger endpoints.

## Objetivo

Definir una autenticacion base para login y proteccion de rutas versionadas.

## Alcance propuesto

Incluye:

- Registro de usuario.
- Login.
- DTOs de request y response.
- Entity de usuario.
- Repository de usuario.
- Hash de password.
- Emision de token.
- Middleware de autenticacion.
- Pruebas unitarias e integracion.

No incluye inicialmente:

- OAuth.
- Recuperacion de password.
- Roles avanzados.
- Refresh tokens, salvo que se defina explicitamente.

## API Contract

### Register

```txt
POST /layer/v1/auth/register
```

Request DTO: `RegisterUserDto`

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

Response DTO: `AuthUserResponseDto`

```json
{
  "data": {
    "id": "uuid",
    "email": "user@example.com"
  }
}
```

### Login

```txt
POST /layer/v1/auth/login
```

Request DTO: `LoginDto`

```json
{
  "email": "user@example.com",
  "password": "secret123"
}
```

Response DTO: `LoginResponseDto`

```json
{
  "data": {
    "token": "jwt-token"
  }
}
```

## Arquitectura

Capas esperadas:

```txt
src/routes/v1/auth.routes.ts
src/controllerss/v1/auth.controller.ts
src/dto/register-user.dto.ts
src/dto/login.dto.ts
src/dto/auth-user-response.dto.ts
src/dto/login-response.dto.ts
src/entities/user.entity.ts
src/services/auth.service.ts
src/services/interface/auth.service.interface.ts
src/repositories/user.repository.ts
src/repositories/interface/user.repository.interface.ts
prisma/schema.prisma
```

## Modelo de dominio

```ts
export interface UserEntity {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Modelo Prisma propuesto

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Reglas de negocio

- El email debe ser unico.
- El password nunca se retorna en responses.
- El password debe guardarse hasheado.
- Login retorna 401 si credenciales son invalidas.
- Endpoints protegidos requieren `Authorization: Bearer <token>`.

## Dependencias probables

```bash
npm install bcrypt jsonwebtoken
npm install -D @types/bcrypt @types/jsonwebtoken
```

## Pruebas

Unitarias:

- Registro con email nuevo.
- Registro con email duplicado.
- Login exitoso.
- Login con password incorrecto.
- Mapeo de `UserEntity` a DTO sin password.

Integracion:

- `POST /layer/v1/auth/register`
- `POST /layer/v1/auth/login`
- Endpoint protegido sin token.
- Endpoint protegido con token valido.

