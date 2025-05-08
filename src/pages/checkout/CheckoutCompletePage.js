
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class CheckoutCompletePage extends BasePage {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]').getByText('Checkout: Complete!');
        this.checkoutCompleteContainer = page.locator('[data-test="checkout-complete-container"]');
        this.thankYouMessage = this.checkoutCompleteContainer.getByText('Thank you for your order!');
        this.confirmationMessage = this.checkoutCompleteContainer.getByText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async goto() {
        await this.page.goto('/checkout-complete.html');
    }
}