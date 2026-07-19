import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PageHeader from "@/components/page-header";

describe("PageHeader", () => {
  it("renders the heading content and action", () => {
    render(
      <PageHeader
        eyebrow="Workspace"
        title="Applications"
        description="Track your preparation."
        action={<button type="button">Create</button>}
      />
    );

    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Applications" })).toBeInTheDocument();
    expect(screen.getByText("Track your preparation.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });
});
