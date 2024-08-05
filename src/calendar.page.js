// calendar.page.js
const { test, expect } = require('@playwright/test');

class CalendarPage {
    constructor(page) {
        this.page = page;
        this.newAppointmentButton = page.locator('input.inputButton');
        this.nameInput = page.locator('input[name="name"]');
        this.dateInput = page.locator('input[name="date"]');
        this.timeInput = page.locator('input[name="time"]');
        this.saveButton = page.locator('button:has-text("Save")');
        this.cancelLink = page.locator('a:has-text("Cancel")');
        this.toastSuccess = page.locator('.Toastify__toast--success');
        //this.appointmentTimeDiv = (date, time) => page.locator(`td >> text=${date} >> div >> p >> text=${time + ":00 -" + time + ":30"}`);
        this.appointmentNameDiv = (date, name) => page.locator(`td >> text=${date} >> div >> p >> text=${name}`);
        this.modal = page.locator('div[style*="position: fixed"]');
    }

    async openModal() {
        await this.newAppointmentButton.click();
    }

    async fillForm(name, date, time) {
        await this.nameInput.fill(name);
        await this.dateInput.fill(date);
        await this.timeInput.fill(time);
    }

    async saveAppointment() {
        await this.saveButton.click();
    }

    async cancelAppointment() {
        await this.cancelLink.click();
    }

    async verifyToastSuccess(message) {
        await expect(this.toastSuccess).toBeVisible();
        await expect(this.toastSuccess).toHaveText(message);
    }

    async verifyAppointment(date, name) {
        await expect(this.appointmentNameDiv(date, name)).toBeVisible();
    }

    async verifyModalClosed() {
        await expect(this.modal).toHaveCount(0);
    }
}

module.exports = CalendarPage;
