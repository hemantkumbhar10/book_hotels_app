import { test, expect } from '@playwright/test';

const FRONTEND_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);
    await page.getByRole("link", { name: "Login" }).click();
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
    await page.locator("[name=email]").fill("test@email.com");
    await page.locator("[name=password]").fill("Test@123");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByText("You logged in successfully!")).toBeVisible();
});


test("should show hotel search results", async ({ page }) => {
    await page.goto(FRONTEND_URL);

    await page.getByPlaceholder('Search the best!').fill("Test city");
    await page.getByRole('button', { name: "Search" }).click();
    await expect(page.getByText("Hotels found in Test City")).toBeVisible();
    await expect(page.getByText("Test Hotel name").first()).toBeVisible();
})



test('should show hotel details', async ({ page }) => {
    page.goto(FRONTEND_URL);
    await page.getByPlaceholder('Search the best!').fill("Test city");
    await page.getByRole('button', { name: "Search" }).click();
    await page.getByText("Test Hotel name").first().click();
    await expect(page).toHaveURL(/detail/);
    await expect(page.getByRole('button', { name: 'Book Now' })).toBeVisible();

})