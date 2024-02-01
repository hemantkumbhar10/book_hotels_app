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

test("should display hotels", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/my-hotels`);

    await expect(page.getByRole("heading", { name: "My Hotels" })).toBeVisible();

    await expect(page.getByText("Test Hotel name").first()).toBeVisible();
    await expect(page.getByText("Test description").first()).toBeVisible();
    await expect(page.getByText("Test city, Test country").first()).toBeVisible();
    await expect(page.getByText("Holiday Resort").first()).toBeVisible();
    await expect(page.getByText("₹ 400 per night").first()).toBeVisible();
    await expect(page.getByText("2 adults, 1 children").first()).toBeVisible();
    await expect(page.getByText("4", { exact: true }).first()).toBeVisible();

    await expect(page.getByRole("link", { name: 'Edit Hotel' }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: 'Create Hotel' })).toBeVisible();
})

test("should allow user to edit hotel", async ({ page }) => {
    await page.goto(`${FRONTEND_URL}/my-hotels`);
    await expect(page.getByRole("heading", { name: "My Hotels" })).toBeVisible();

    await page.getByRole('link', { name: 'Edit Hotel' }).first().click();

    //WAITS FOR PAGE UNTIL DOM LOADS SPECIFIED SELECTOR
    await page.waitForSelector('[name="name"]', { state: "attached" });

    await expect(page.locator('[name="name"]')).toHaveValue('Test Hotel name');

    await page.locator("[name=name]").fill("Test Hotel name edited");
    await page.locator("[name=city]").fill("Test city Edited");
    await page.locator("[name=country]").fill("Test country Edited");
    await page.locator("[name=description]").fill("Edited Test description goees bla bla bla for hotel here..");
    await page.locator("[name=starRating]").fill("5");
    await page.locator("[name=pricePerNight]").fill("4000");

    await page.getByText("Casino").click();
    await page.getByLabel("Restaurant").uncheck();

    await page.locator("[name=adultCount]").fill("3");
    await page.locator("[name=childrenCount]").fill("2");
    /////////////////////////////////////////////////////////////////////////

    await page.getByRole('button', { name: "Update Hotel" }).click();
    await expect(page.getByText('Hotel Updated Successfully!')).toBeVisible();

    await page.reload();
    await expect(page.locator('[name="name"]')).toHaveValue("Test Hotel name edited");
    await expect(page.locator("[name=city]")).toHaveValue("Test city Edited");
    await expect(page.locator("[name=country]")).toHaveValue("Test country Edited");
    await expect(page.locator("[name=description]")).toHaveValue("Edited Test description goees bla bla bla for hotel here..");
    await expect(page.locator("[name=starRating]")).toHaveValue("5");
    await expect(page.locator("[name=pricePerNight]")).toHaveValue("4000");
    await expect(page.getByText('Casino')).toBeChecked();
    const check = await page.getByText("Restaurant").isChecked();
    await expect(check).toBeFalsy();



    /////////////////////////////////////////////////////////////////////////
    await page.locator("[name=name]").fill("Test Hotel name");
    await page.locator("[name=city]").fill("Test city");
    await page.locator("[name=country]").fill("Test country");
    await page.locator("[name=description]").fill("Test description goees bla bla bla for hotel here..");
    await page.locator("[name=starRating]").fill("4");
    await page.locator("[name=pricePerNight]").fill("400");

    await page.getByText("Holiday Resort").check();

    await page.locator("[name=adultCount]").fill("2");
    await page.locator("[name=childrenCount]").fill("1");
    await page.getByRole('button', { name: "Update Hotel" }).click();

});


