// @ts-check
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../../pages/products/InventoryPage';
import { LoginPage } from '../../pages/LoginPage';
import { BasePage } from '../../pages/BasePage';

test.describe('Product Sorting Validation', () => {
    
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login();
    });

    test.afterEach(async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.resetAppState();
        await basePage.logout();
    });

    test('should sort products by name (A to Z)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortingDropdown.selectOption({ value: 'az' });
        const productNames = await inventoryPage.getProductNames();
        const sortedNames = [...productNames].sort();
        expect(productNames).toEqual(sortedNames);
    });

    test('should sort products by name (Z to A)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortingDropdown.selectOption({ value: 'za' });
        const productNames = await inventoryPage.getProductNames();
        const sortedNames = [...productNames].sort().reverse();
        expect(productNames).toEqual(sortedNames);
    });

    test('should sort products by price (low to high)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortingDropdown.selectOption({ value: 'lohi' });
        const productPrices = await inventoryPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => a - b);
        expect(productPrices).toEqual(sortedPrices);
    });

    test('should sort products by price (high to low)', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.sortingDropdown.selectOption({ value: 'hilo' });
        const productPrices = await inventoryPage.getProductPrices();
        const sortedPrices = [...productPrices].sort((a, b) => b - a);
        expect(productPrices).toEqual(sortedPrices);
    });
});
