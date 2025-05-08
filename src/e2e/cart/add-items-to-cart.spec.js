// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/products/InventoryPage';
import { CartPage } from '../../pages/CartPage';
    
test('Add one or more items to the shopping cart', async ({ page }) => {

    // Login
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    await loginPage.goto();
    await loginPage.login();

    // Let page load
    await expect(inventoryPage.pageTitle).toBeVisible();

    // Grab item details
    const itemName = await inventoryPage.itemNameByIndex(0).textContent();
    const itemDesc = await inventoryPage.itemDescriptionByIndex(0).textContent();
    const itemPrice = await inventoryPage.itemPriceByIndex(0).textContent();

    // Verify adding 1 item to the cart
    await expect(inventoryPage.shoppingCartLink).toHaveText('');
    await inventoryPage.addToCartButtonByIndex(0).click();
    await expect(inventoryPage.addToCartButtonByIndex(0)).toHaveCount(0);
    await expect(inventoryPage.removeButtonByIndex(0)).toBeVisible();
    await expect(inventoryPage.shoppingCartLink).toHaveText('1');

    // Check the cart
    await inventoryPage.shoppingCartLink.click();
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.inventoryItemByIndex(0)).toBeVisible();
    await expect(cartPage.itemNameByIndex(0)).toHaveText(itemName || 'default name');
    await expect(cartPage.itemDescriptionByIndex(0)).toHaveText(itemDesc || 'default name');
    await expect(cartPage.itemPriceByIndex(0)).toHaveText(itemPrice || 'default name');

    // Verify adding 2nd item to the cart
    await inventoryPage.goto();
    await expect(inventoryPage.pageTitle).toBeVisible();

    // Grab item details
    const itemNameTwo = await inventoryPage.itemNameByIndex(1).textContent();
    const itemDescTwo = await inventoryPage.itemDescriptionByIndex(1).textContent();
    const itemPriceTwo = await inventoryPage.itemPriceByIndex(1).textContent();

    // Verify adding another item to the cart
    await expect(inventoryPage.shoppingCartLink).toHaveText('1');
    await inventoryPage.addToCartButtonByIndex(1).click();
    await expect(inventoryPage.addToCartButtonByIndex(1)).toHaveCount(0);
    await expect(inventoryPage.removeButtonByIndex(1)).toBeVisible();
    await expect(inventoryPage.shoppingCartLink).toHaveText('2');

    // Check the cart that items are added correctly
    await inventoryPage.shoppingCartLink.click();
    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.inventoryItemByIndex(1)).toBeVisible();
    await expect(cartPage.itemNameByIndex(1)).toHaveText(itemNameTwo || 'default name');
    await expect(cartPage.itemDescriptionByIndex(1)).toHaveText(itemDescTwo || 'default name');
    await expect(cartPage.itemPriceByIndex(1)).toHaveText(itemPriceTwo || 'default name');
});
