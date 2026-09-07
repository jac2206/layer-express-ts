# Swagger Instructions

## Objetivo

Mantener documentacion OpenAPI clara cuando el proyecto agregue Swagger.

## Estado actual

El proyecto no tiene Swagger instalado todavia.

## Paquetes sugeridos

```bash
npm install swagger-ui-express swagger-jsdoc
npm install -D @types/swagger-ui-express
```

## Ubicacion sugerida

```txt
src/config/swagger.ts
src/docs
```

## Reglas

- Documentar endpoints publicos.
- Mantener examples reales de request y response.
- Usar version `/layer/v1`.
- No duplicar reglas que ya viven en services.
- Actualizar docs cuando cambie contrato HTTP.

## Ruta sugerida

```txt
GET /layer/docs
```

