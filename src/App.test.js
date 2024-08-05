// login.spec.js
const { test, expect } = require('@playwright/test');

test.describe('Login Component', () => {
    test('should display error messages for invalid input and navigate to Calendar on successful login', async ({ page }) => {
        // Navigate to the page containing the Login component
        await page.goto('http://localhost:3000'); // Adjust URL as needed

        // Fill in email and password fields with invalid data
        await page.fill('#email', 'invalid-email');
        await page.fill('#password', 'short');

        // Click the login button (which is a Link to /Calendar)
        // await page.click('#login');

        // Check for error messages (assuming the component updates the state and shows these errors)
       
        // Clear the fields and input valid data
        await page.fill('#email', 'user@example.com');
        await page.fill('#password', 'ValidPassword123');

        // Click the login button again
        await page.click('a.btn-primary');

        // Verify navigation to the calendar page
        //await page.waitForURL('http://localhost:3000/cle'); // Adjust URL as needed
        await expect(page.url()).toBe('http://localhost:3000/Calendar');
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

const CalendarPage = require('./calendar.page');

test.describe('Calendar Component', () => {
    let calendarPage;

    test.beforeEach(async ({ page }) => {
        calendarPage = new CalendarPage(page);
        await page.goto('http://localhost:3000/calendar'); // Adjust URL as needed
    });

    test('should open the modal and save an appointment', async () => {
        await calendarPage.openModal();
        await calendarPage.fillForm('Meeting with Bede', 'Monday', '14');
        await calendarPage.saveAppointment();
        await calendarPage.verifyToastSuccess('Appointment saved successfully!');
        await calendarPage.verifyAppointment('Monday', 'Meeting with Bede');
        // test email sent > depending on mail service response.
    });

    test('should close the modal on cancel', async () => {
        await calendarPage.openModal();
        await calendarPage.cancelAppointment();
        await calendarPage.verifyModalClosed();
    });
});