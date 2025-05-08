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

        // Header
        this.pageTitle = page.locator('[data-test="title"]').getByText('Products');
        this.sortingDropdown = page.locator('[data-test="product-sort-container"]');

        // Product List
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.itemDescriptions = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
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
    
    async getProductNames() {
        const nameLocators = await this.itemNames.all();
        return await Promise.all(nameLocators.map(locator => locator.textContent()));
      }

    async getProductPrices() {
        const priceLocators = await this.itemPrices.all();
        const prices = await Promise.all(priceLocators.map(locator => locator.textContent()));
        return prices.map(price => parseFloat(price?.replace('$', '')));
    }
}