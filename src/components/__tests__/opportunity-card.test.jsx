import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import OpportunityCard from "@/components/opportunity-card";

const opportunity = {
  title: "International Robotics Scholarship",
  slug: "international-robotics-scholarship",
  providerName: "Example University",
  coverImage: "https://example.com/cover.jpg",
  shortDescription: "A funded graduate robotics scholarship.",
  category: "graduate-scholarship",
  funding: { amount: 25000, currency: "USD" },
  deadline: "2027-08-15T00:00:00.000Z"
};

describe("OpportunityCard", () => {
  it("renders opportunity information", () => {
    render(<OpportunityCard opportunity={opportunity} />);

    expect(screen.getByRole("heading", { name: opportunity.title })).toBeInTheDocument();
    expect(screen.getByText("Example University")).toBeInTheDocument();
    expect(screen.getByText("Graduate Scholarship")).toBeInTheDocument();
    expect(screen.getByText(/\$25,000/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: opportunity.title })).toHaveAttribute(
      "src",
      opportunity.coverImage
    );
  });

  it("links to the public opportunity details page", () => {
    render(<OpportunityCard opportunity={opportunity} />);

    expect(screen.getByRole("link", { name: "View details" })).toHaveAttribute(
      "href",
      "/opportunities/international-robotics-scholarship"
    );
  });
});
