
import { test, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]').getByText('Your Cart');

        this.inventoryItemByIndex = (index) => page.locator('[data-test="inventory-item"]').nth(index);
        this.itemNameByIndex = (index) => this.inventoryItemByIndex(index).locator('[data-test="inventory-item-name"]');
        this.itemDescriptionByIndex = (index) => this.inventoryItemByIndex(index).locator('[data-test="inventory-item-desc"]');
        this.itemPriceByIndex = (index) => this.inventoryItemByIndex(index).locator('[data-test="inventory-item-price"]');
        this.inventoryItemByIndex = (index) => page.locator('[data-test="inventory-item"]').nth(index);

        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async goto() {
        await this.page.goto('/cart.html');
    }
}