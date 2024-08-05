// login.spec.js
const { test, expect } = require('@playwright/test');
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

    test('should show erros if invalid data', async () => {
        await calendarPage.openModal();
        //Test for :
        // no data in name 
        // no data in date
        // no data or wrong format in time
        // double booking 
        //etc
    });

    test('should close the modal on cancel', async () => {
        await calendarPage.openModal();
        await calendarPage.cancelAppointment();
        await calendarPage.verifyModalClosed();
    });
});