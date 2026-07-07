import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusDot } from "@/components/status-dot";

describe("StatusDot", () => {
  it("affiche le label FR pour un projet shipped", () => {
    render(<StatusDot status="shipped" lang="fr" />);
    expect(screen.getByText("Livré")).toBeInTheDocument();
  });

  it("affiche le label EN pour un projet in-progress", () => {
    render(<StatusDot status="in-progress" lang="en" />);
    expect(screen.getByText("In progress")).toBeInTheDocument();
  });

  it("rend un point décoratif", () => {
    const { container } = render(<StatusDot status="shipped" lang="fr" />);
    const dot = container.querySelector("span > span:first-child");
    expect(dot).not.toBeNull();
  });
});