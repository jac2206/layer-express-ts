# Prompt Instructions

## Como pedir cambios a agentes

Un buen pedido debe incluir:

- Objetivo de negocio.
- Endpoint o modulo afectado.
- Contrato esperado de request/response.
- Reglas de validacion.
- Persistencia esperada si aplica.
- Pruebas esperadas.

## Template corto

```md
Quiero agregar [feature] en [modulo].

Endpoint:
- Metodo:
- Path:

Request:

Response exitosa:

Errores:

Persistencia:

Pruebas:
```

## Para cambios con DB

Incluir:

- Motor de base de datos.
- Modelo o entidad.
- Campos requeridos.
- Relaciones.
- Indices o constraints.
- Comportamiento de migracion.

## Para pedir revision

Pedir explicitamente:

```txt
Revisa este cambio como code review.
```

El agente debe priorizar bugs, riesgos, regresiones y pruebas faltantes.

