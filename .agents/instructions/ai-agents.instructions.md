# AI Agents Instructions

## Antes de tocar codigo

1. Leer `.agents/AGENTS.md`.
2. Leer `.agents/context.md`.
3. Identificar capa afectada.
4. Revisar archivos existentes del modulo cercano.
5. Mantener el estilo actual del proyecto.

## Durante el cambio

- Hacer cambios pequenos y enfocados.
- No reescribir arquitectura sin necesidad.
- No mezclar refactors con features.
- No tocar workflows o config no relacionados.
- No revertir cambios del usuario.
- Usar nombres claros y consistentes.

## Despues del cambio

Ejecutar, si aplica:

```bash
npm run build
npm run test:run
```

Reportar:

- Archivos modificados.
- Comandos ejecutados.
- Pruebas que pasaron o no se pudieron correr.

## Criterio de salida

Un cambio esta listo cuando:

- Compila.
- Tiene pruebas proporcionales al riesgo.
- Respeta capas.
- Queda documentado si introduce una decision nueva.

