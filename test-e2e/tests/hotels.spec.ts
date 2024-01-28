import { test, expect } from '@playwright/test';
import path from 'path';


const FRONTEND_URL = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
    await page.goto(FRONTEND_URL);

    //"link"-->a tag
    await page.getByRole("link", { name: "Login" }).click();

    //"heading"--> h1-h6 tags
    //CHECKING IF LOGIN LINK BUTTON SUCCESFULLY DIRECTED TO LOGIN PAGE
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();
a
    //FLOODING EMAIL FIELD OF LOGIN PAGE
    await page.locator("[name=email]").fill("test@email.com");

    //FLOODING PASSWORD FIELD OF LOGIN PAGE
    await page.locator("[name=password]").fill("Test@123");

    await page.getByRole("button", { name: "Log in" }).click();

    //ASSERT SUCCESSFULL LOGIN
    //CHECKING SUCCESS TOAST MESSAGE
    await expect(page.getByText("You logged in successfully!")).toBeVisible();
})


test("should allow user to create new hotel", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/add-hotel`);


    await expect(page.getByRole("heading", { name: "Add New Hotel" })).toBeVisible();

    await page.locator("[name=name]").fill("Test Hotel name");
    await page.locator("[name=city]").fill("Test city");
    await page.locator("[name=country]").fill("Test country");
    await page.locator("[name=description]").fill("Test description goees bla bla bla for hotel here..");
    await page.locator("[name=starRating]").fill("4");
    await page.locator("[name=pricePerNight]").fill("400");

    await page.getByText("Holiday Resort").check();
    await page.getByLabel("Restaurant").check();
    await page.getByLabel("Bar").check();

    await page.locator("[name=adultCount]").fill("2");
    await page.locator("[name=childrenCount]").fill("1");

    await page.setInputFiles('[name=hotelImages]', [
        path.join(__dirname, "files", "test1.jpg"),
        path.join(__dirname, "files", "test2.jpg"),
    ])

    await page.getByRole('button', { name: "Create Hotel" }).click();
    await expect(page.getByText("New Hotel Created!")).toBeVisible();


})