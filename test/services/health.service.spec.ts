import { describe, it, expect } from "vitest";

import { HealthService } from "../../src/services/health.service";

describe("HealthService", () => {
  it("should return status ok", async () => {
    const service = new HealthService();

    const result = await service.getStatus();

    expect(result.status).toBe("ok");
  });
});
