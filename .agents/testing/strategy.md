# Testing Strategy

## Objetivo

Garantizar que el backend compile, que la logica central funcione, que Prisma valide y que los endpoints criticos respondan con contratos estables.

## Piramide de pruebas

Prioridad:

1. Unit tests para services.
2. Unit tests para mapping entity/DTO si hay transformaciones sensibles.
3. Integration tests para endpoints importantes.
4. Repository/DB tests con base de datos de test aislada.

## Comandos

```bash
npm run build
npm run test:run
npm run test:coverage
npm run prisma:validate
npm run prisma:generate
```

## Cobertura esperada

Cubrir:

- Reglas de negocio en services.
- Mapeo Prisma -> entity en repositories cuando sea delicado.
- Ramas de error.
- Contratos HTTP principales.
- Integracion controller/service para endpoints importantes.

## DB tests

Cuando se prueben repositories reales:

- Usar `DATABASE_URL` de test.
- No usar DB de desarrollo en CI.
- Limpiar datos entre pruebas.
- Evitar que tests dependan del orden de ejecucion.

## Criterio minimo por feature

Una feature backend debe cerrar con:

- Build exitoso.
- Prisma validate exitoso si toca modelos.
- Prisma generate ejecutado si cambia schema.
- Tests de service si tiene logica.
- Test de endpoint si expone API nueva.
- Spec actualizada si cambia contrato.