import { expect, test } from "@playwright/test";

test.describe("public website", () => {
  test("renders the seven-section landing page", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Find the right funding/i })
    ).toBeVisible();
    await expect(page.getByText("How it works", { exact: true })).toBeVisible();
    await expect(page.getByText("Agentic AI workflows", { exact: true })).toBeVisible();
    await expect(page.getByText("Funding categories", { exact: true })).toBeVisible();
    await expect(page.getByText("Pricing", { exact: true }).first()).toBeVisible();
  });

  test("navigates to resources and opens a guide", async ({ page }) => {
    await page.goto("/resources");

    await expect(
      page.getByRole("heading", { name: /Practical preparation guides/i })
    ).toBeVisible();

    await expect(page.getByRole("link", { name: "Read guide" }).first()).toBeVisible();

    await page.goto("/resources/how-to-evaluate-scholarship-eligibility");
    await expect(page).toHaveURL(/\/resources\/how-to-evaluate-scholarship-eligibility/);
    await expect(page.getByRole("link", { name: "All resources" })).toBeVisible();
  });

  test("renders authentication pages", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Welcome back" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Log in", exact: true })).toBeVisible();

    await page.goto("/register");
    await expect(page.getByRole("heading", { name: "Create account" })).toBeVisible();
  });

  test("renders the custom not-found page", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");

    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(page.getByRole("link", { name: /Return home/i })).toBeVisible();
  });
});
