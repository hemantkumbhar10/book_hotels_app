import { test, expect } from '@playwright/test';


const FRONTEND_URL = "http://localhost:5173";

//TESTING LOGIN FUNCTIONALITY

test('should allow user to login', async ({ page }) => {
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
  //CHECKING IF LOGOUT BUTTON APPEARS
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
  //CHECKING IF SECURE LINKS ARE VISIBLE
  await expect(page.getByRole("link", { name: "Reservations" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Favourites" })).toBeVisible();

});


test("should allow user to sign up", async ({ page }) => {

  const emailTest = `testreg${Math.floor(Math.random() * 8000) +1000}@email.com`

  await page.goto(FRONTEND_URL);

  await page.getByRole("link", { name: "Login" }).click();

  await page.getByRole("link", { name: "Create new account" }).click();

  //ASSERT SUCCESSFULL DIRECTION TO REGISTER PAGE
  await expect(page.getByRole("heading", { name: "Create New Account" })).toBeVisible();

  //CHECKING IF LOGIN OPTION STILL AVAILABLE IN NAVBAR
  await expect(page.getByRole("link", { name: "Login" })).toBeVisible();

  //FLOODING INPUT FIELDS
  await page.locator("[name=firstname]").fill("TestREGfirstname");
  await page.locator("[name=lastname]").fill("TestREGlastname");
  await page.locator("[name=email]").fill(emailTest);
  await page.locator("[name=password]").fill("testREG@123");
  await page.locator("[name=confirmPassword]").fill("testREG@123");

  await page.getByRole("button", { name: "Create New Account" }).click();


   //ASSERT SUCCESSFULL REGISTER
  await expect(page.getByText("You have registered successfully!")).toBeVisible();
  await expect(page.getByRole("button", { name: "Log out" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Reservations" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Favourites" })).toBeVisible();


})