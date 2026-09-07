# Swagger Skill

## Uso

Usar esta guia cuando se agreguen docs OpenAPI/Swagger.

## Pasos recomendados

1. Instalar dependencias.
2. Crear `src/config/swagger.ts`.
3. Montar Swagger UI en `src/server.ts`.
4. Documentar endpoints versionados.
5. Agregar ejemplos de response.

## Estructura recomendada

```txt
src/docs/openapi.ts
src/config/swagger.ts
```

## Convenciones

- Tags por recurso.
- Paths con prefijo real.
- Schemas reutilizables.
- Responses 200, 201, 400, 404 y 500 cuando apliquen.

## Validacion

Antes de cerrar:

- Abrir `/layer/docs`.
- Confirmar que aparecen endpoints.
- Confirmar que examples coinciden con controllers.

