
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class CheckoutStepOnePage extends BasePage {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]').getByText('Checkout: Your Information');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.zipCodeInput = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async goto() {
        await this.page.goto('/checkout-step-one.html');
    }
}