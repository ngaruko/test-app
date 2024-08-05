// login.spec.js
const { test, expect } = require('@playwright/test');
const CalendarPage = require('./calendar.page');


test.describe('Login Component', () => {
    test('should display error messages for invalid input and navigate to Calendar on successful login', async ({ page }) => {
        // Navigate to the page containing the Login component
        await page.goto('http://localhost:3000'); // Adjust URL as needed

        // Fill in email and password fields with invalid data
        await page.fill('#email', 'invalid-email');
        await page.fill('#password', 'short');
        // test for no password used
        //test for no email used
        //Test for case sensitivity if applicable

        // Click the login button (which is a Link to /Calendar)
        // await page.click('#login');

        // Check for error messages (assuming the component updates the state and shows these errors)
       
        // Clear the fields and input valid data
        await page.fill('#email', 'user@example.com');
        await page.fill('#password', 'ValidPassword123');

        // Click the login button again
        await page.click('a.btn-primary');

        // Verify navigation to the calendar page
        await expect(page.url()).toBe('http://localhost:3000/Calendar');
        // check that username is same as login user
    });

    test('should navigate to the registration page on Sign up link click', async ({ page }) => {
        // Navigate to the page containing the Login component
        await page.goto('http://localhost:3000'); // Adjust URL as needed

        // Click the Sign up link
        await page.click('a:has-text("Sign up")');

        // Verify navigation to the registration page
        await page.waitForURL('http://localhost:3000/register'); // Adjust URL as needed
        await expect(page.url()).toBe('http://localhost:3000/register');
    });

    test('should navigate to the reset password page on Forgot Password link click', async ({ page }) => {
        // Navigate to the page containing the Login component
        await page.goto('http://localhost:3000'); // Adjust URL as needed

        // Click the Forgot Password link
        await page.click('a:has-text("Forgot Password")');

        // Verify navigation to the reset password page
        await page.waitForURL('http://localhost:3000/reset'); // Adjust URL as needed
        await expect(page.url()).toBe('http://localhost:3000/reset');
    });
});

