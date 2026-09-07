# Backend Patterns

## Modulo nuevo

Estructura sugerida para un recurso `example`:

```txt
src/controllers/v1/example.controller.ts
src/dto/example/create-example.dto.ts
src/entities/example.entity.ts
src/repositories/example.repository.ts
src/repositories/interface/example.repository.interface.ts
src/routes/v1/example.routes.ts
src/services/example.service.ts
src/services/interface/example.service.interface.ts
prisma/models/example.prisma
```

## DTO pattern

```ts
export interface CreateExampleDto {
  name: string;
}
```

## Entity pattern

```ts
export class Example {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date | null,
  ) {}
}
```

## Repository mapping pattern

Prisma puede usar snake_case en DB y entities camelCase en TypeScript.

```ts
return new Example(
  record.id,
  record.name,
  record.created_at,
  record.updated_at,
);
```

## Service pattern

```ts
export class ExampleService implements IExampleService {
  constructor(private readonly exampleRepository: IExampleRepository) {}

  create(data: CreateExampleDto): Promise<Example> {
    return this.exampleRepository.create(data);
  }
}
```

## Controller pattern

```ts
export class ExampleController {
  constructor(private readonly exampleService: IExampleService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const example = await this.exampleService.create(req.body);

    res.status(201).json(example);
  };
}
```

## Route pattern

```ts
router.post("/", (req, res) => {
  const controller = container.resolve<ExampleController>("exampleController");
  controller.create(req, res);
});
```

## Prisma model pattern

```prisma
model Example {
  id         String    @id @default(uuid())
  name       String
  created_at DateTime  @default(now())
  updated_at DateTime? @updatedAt

  @@map("examples")
  @@schema("layer")
}
```