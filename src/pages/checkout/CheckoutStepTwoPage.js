
import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class CheckoutStepTwoPage extends BasePage {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]').getByText('Checkout: Overview');

        this.inventoryItemByIndex = (index) => page.locator('[data-test="inventory-item"]').nth(index);
        this.itemNameByIndex = (index) => this.inventoryItemByIndex(index).locator('[data-test="inventory-item-name"]');
        this.itemDescriptionByIndex = (index) => this.inventoryItemByIndex(index).locator('[data-test="inventory-item-desc"]');
        this.itemPriceByIndex = (index) => this.inventoryItemByIndex(index).locator('[data-test="inventory-item-price"]');
        this.inventoryItemByIndex = (index) => page.locator('[data-test="inventory-item"]').nth(index);

        this.paymentInfoLabel = page.locator('[data-test="payment-info-label"]');
        this.paymentInfoValue = page.locator('[data-test="payment-info-value"]');
        this.shippingInfoLabel = page.locator('[data-test="shipping-info-label"]');
        this.shippingInfoValue = page.locator('[data-test="shipping-info-value"]');
        this.subtotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.total = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.cancelButton = page.locator('[data-test="cancel"]');
    }

    async goto() {
        await this.page.goto('/checkout-step-two.html');
    }
}