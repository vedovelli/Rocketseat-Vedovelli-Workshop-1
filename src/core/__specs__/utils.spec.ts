import { describe, it, expect } from "vitest";
import { noop } from "@core/utils";

describe("core/utils", () => {
  it("noop does nothing", () => {
    expect(noop()).toBeUndefined();
  });
});
