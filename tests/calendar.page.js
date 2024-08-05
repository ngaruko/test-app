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
        this.appointmentNameDiv = (day, name) => page.locator(`td#${day} >> div >> div:has-text("${name}")`);        
        this.appointmentTimeDiv = (day, time) => page.locator(`td#${day} >> div >> div:has-text("${time}")`);
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

    async verifyAppointment(name, date, time) {
        await expect(this.appointmentNameDiv(date, name)).toBeVisible();
        await expect(this.appointmentTimeDiv(date, time)).toBeVisible();
    }

    async verifyModalClosed() {
        await expect(this.modal).toHaveCount(0);
    }
}

module.exports = CalendarPage;
