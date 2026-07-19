import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import EmptyState from "@/components/empty-state";

describe("EmptyState", () => {
  it("renders a title and description", () => {
    render(
      <EmptyState
        title="No applications yet"
        description="Start an application from an opportunity."
      />
    );

    expect(screen.getByRole("heading", { name: "No applications yet" })).toBeInTheDocument();
    expect(screen.getByText("Start an application from an opportunity.")).toBeInTheDocument();
  });

  it("renders an optional action link", () => {
    render(
      <EmptyState
        title="No saved items"
        description="Save an opportunity."
        href="/opportunities"
        label="Explore opportunities"
      />
    );

    expect(screen.getByRole("link", { name: "Explore opportunities" })).toHaveAttribute(
      "href",
      "/opportunities"
    );
  });
});
