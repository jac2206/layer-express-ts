# Specs README

## Proposito

Las specs describen features antes de implementarlas. Funcionan como SDD liviano: contexto, contrato, arquitectura, datos, pruebas y estado.

## Specs actuales

- [auth.spec.md](auth.spec.md): propuesta futura para autenticacion.
- [spec.template.md](spec.template.md): plantilla para nuevas specs.

## Modulos implementados

- Authors: routes, controller, service, repository, entity, DTO y modelo Prisma.
- Posts: routes, controller, service, repository, entity, DTO y modelo Prisma.

## Como usar

1. Copiar `spec.template.md`.
2. Renombrar con el modulo o feature.
3. Completar contrato HTTP, DTOs, entity, repository y modelo Prisma si aplica.
4. Actualizar la spec si cambia el contrato.

## Estados

- `draft`: idea en construccion.
- `ready`: lista para implementar.
- `in-progress`: en desarrollo.
- `done`: implementada y verificada.
- `paused`: bloqueada o aplazada.