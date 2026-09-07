# Vitest Skill

## Uso

Usar esta guia al agregar o modificar pruebas.

## Comandos

```bash
npm run test:run
npm run test:coverage
```

## Unit tests

Usar para:

- Services.
- Reglas puras.
- Transformaciones.
- Validaciones independientes de Express.

Ejemplo:

```ts
import { describe, expect, it } from "vitest";
import { HealthService } from "../../src/services/health.service";

describe("HealthService", () => {
  it("returns ok status", async () => {
    const service = new HealthService();

    await expect(service.getStatus()).resolves.toEqual({ status: "ok" });
  });
});
```

## Integration tests

Usar para:

- Endpoints.
- Middlewares.
- Status codes.
- Response body.

Ejemplo:

```ts
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createServer } from "../../src/server";

describe("GET /layer/health", () => {
  it("returns ok", async () => {
    const app = createServer();

    const response = await request(app).get("/layer/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "ok" });
  });
});
```

## Reglas

- No depender de orden entre tests.
- Mockear repositorios al probar services.
- Probar errores esperados.
- Mantener tests legibles y cortos.

