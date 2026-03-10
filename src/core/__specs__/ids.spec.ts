import { describe, it, expect } from "vitest";
import { createId } from "@core/ids";

describe("core/ids", () => {
  it("createId returns a non-empty string", () => {
    const id = createId();
    expect(typeof id).toBe("string");
    expect(id.length).toBeGreaterThan(0);
  });
});
