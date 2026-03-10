import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@ui/button";

describe("ui/Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });
});
