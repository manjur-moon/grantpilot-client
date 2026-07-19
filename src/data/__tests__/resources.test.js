import { describe, expect, it } from "vitest";
import { getResourceBySlug, resources } from "@/data/resources";

describe("resources data", () => {
  it("contains unique resource slugs", () => {
    const slugs = resources.map((resource) => resource.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("returns a resource by slug", () => {
    const resource = getResourceBySlug("statement-of-purpose-preparation");
    expect(resource?.title).toMatch(/Statement of Purpose/i);
    expect(resource?.sections.length).toBeGreaterThan(0);
  });

  it("returns undefined for an unknown resource", () => {
    expect(getResourceBySlug("unknown-resource")).toBeUndefined();
  });
});
