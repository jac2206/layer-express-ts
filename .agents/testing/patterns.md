# Testing Patterns

## Service tests

Los services deben probarse con dependencies mockeadas, especialmente `repositories`.

```ts
import { describe, expect, it, vi } from "vitest";

import { UserService } from "../../src/services/user.service";

describe("UserService", () => {
  it("returns users from repository", async () => {
    const userRepository = {
      findAll: vi.fn().mockResolvedValue([{ id: "1", email: "a@test.com" }])
    };

    const service = new UserService(userRepository);

    await expect(service.getUsers()).resolves.toEqual([
      { id: "1", email: "a@test.com" }
    ]);
  });
});
```

## DTO tests

Probar DTO mapping cuando oculte datos sensibles o transforme entities.

Casos clave:

- No retornar `password`.
- Mantener campos obligatorios.
- Transformar fechas de forma consistente si aplica.

## Repository tests

Cuando entre Prisma:

- Unit tests de services deben mockear repositories.
- Tests de repositories pueden usar DB de test aislada.
- No usar DB de desarrollo en CI.

## Route integration tests

Usar `supertest` y `createServer`.

```ts
import request from "supertest";
import { createServer } from "../../src/server";

it("returns health", async () => {
  const response = await request(createServer()).get("/layer/health");

  expect(response.status).toBe(200);
});
```

## Error tests

Validar:

- Status code.
- Mensaje.
- Codigo interno si existe.
- Que no se filtren detalles sensibles.

