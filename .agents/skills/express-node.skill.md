# Express Node Skill

## Uso

Usar esta guia al crear o modificar endpoints Express.

## Checklist para endpoint

- Crear o actualizar route.
- Crear o actualizar controller.
- Llamar service desde controller.
- Registrar controller/service en Awilix.
- Montar route en router versionado.
- Agregar prueba de integracion si el endpoint es relevante.

## Route example

```ts
router.get("/", (req, res) => {
  const controller = container.resolve<UserController>("userController");
  controller.getUsers(req, res);
});
```

## Response shape

Preferir respuestas JSON predecibles:

```json
{
  "data": []
}
```

Para errores:

```json
{
  "message": "Route not found",
  "code": 404
}
```

## Buenas practicas

- No bloquear el event loop.
- Usar handlers async.
- Mantener controllers delgados.
- Validar input antes de llamar reglas de negocio complejas.

