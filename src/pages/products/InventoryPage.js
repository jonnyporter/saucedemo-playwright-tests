import { test, expect } from '@playwright/test';

export class InventoryPage {
    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
    }

    async goto() {
        await this.page.goto('/inventory.html');
    }
}