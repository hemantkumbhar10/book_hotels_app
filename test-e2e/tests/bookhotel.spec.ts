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

test('should book hotel', async ({ page }) => {
    page.goto(FRONTEND_URL);
    await page.getByPlaceholder('Search the best!').fill("Test city");

    const date = new Date();
    date.setDate(date.getDate() + 3);
    const formattedDate = date.toISOString().split("T")[0];
    await page.getByPlaceholder("Check-out Date").fill(formattedDate);


    await page.getByRole('button', { name: "Search" }).click();

    await page.getByText("Test Hotel name").first().click();

    await page.getByRole('button', { name: 'Book Now' }).click();

    await expect(page.getByText("Total Bill: ₹ 12000.00")).toBeVisible();

    const stripeFrame = page.frameLocator('iframe').first();

    await stripeFrame.locator('[placeholder="Card number"]').fill("4242424242424242");

    await stripeFrame.locator('[placeholder="MM / YY"]').fill("04/30");
    await stripeFrame.locator('[placeholder="CVC"]').fill("242");
    await stripeFrame.locator('[placeholder="ZIP"]').fill("24235");


    await page.getByRole('button', { name: "Confirm Payment" }).click();
    await expect(page.getByText("Congratulations! You got the keys!")).toBeVisible();
})