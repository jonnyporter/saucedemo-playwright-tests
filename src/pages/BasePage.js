import { test, expect } from '@playwright/test';

export class BasePage {

    /**
     * 
     * @param {import('@playwright/test').Page} page 
     */
    constructor(page) {
        this.page = page;

        // Header locators
        this.title = page.locator('[data-test="title"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }

}