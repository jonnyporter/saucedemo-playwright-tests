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
        this.openMenuButton = page.getByRole('button', { name: 'Open Menu' });
        this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
        this.resetSideBarLink = page.locator('[data-test="reset-sidebar-link"]');
        this.logoutSideBarLink = page.locator('[data-test="logout-sidebar-link"]');
    }

    async resetAppState() {
        if (this.resetSideBarLink.isHidden) await this.openMenuButton.click();
        await this.resetSideBarLink.click();
        await this.closeMenuButton.click();
    }

    async logout() {
        if (this.logoutSideBarLink.isHidden) await this.openMenuButton.click();
        await this.logoutSideBarLink.click();
        await expect(this.title).toHaveCount(0);
    }
}