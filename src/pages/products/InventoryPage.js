import { test, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class InventoryPage extends BasePage {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        super(page);
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]').getByText('Products');

        // Product List
        this.inventoryItemByIndex = (index) => page.locator('[data-test="inventory-item"]').nth(index);
        this.itemNameByIndex = (index) => this.inventoryItemByIndex(index).locator('[data-test="inventory-item-name"]');
        this.itemDescriptionByIndex = (index) => this.inventoryItemByIndex(index).locator('[data-test="inventory-item-desc"]');
        this.itemPriceByIndex = (index) => this.inventoryItemByIndex(index).locator('[data-test="inventory-item-price"]');
        this.addToCartButtonByIndex = (index) => this.inventoryItemByIndex(index).locator('button').getByText('Add to cart');
        this.removeButtonByIndex = (index) => this.inventoryItemByIndex(index).locator('button').getByText('Remove');
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }
}