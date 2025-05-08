// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/products/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutStepOnePage } from '../../pages/checkout/CheckoutStepOnePage';
import { CheckoutStepTwoPage } from '../../pages/checkout/CheckoutStepTwoPage';
import { CheckoutCompletePage } from '../../pages/checkout/CheckoutCompletePage';
    
const firstName = 'Johnny';
const lastName = 'Appleseed';
const zipCode = '12345';

test('Proceed through the checkout process and complete a purchase', async ({ page }) => {

    // Login
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutStepOnePage = new CheckoutStepOnePage(page);
    const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);
    await loginPage.goto();
    await loginPage.login();

    // Let page load
    await expect(inventoryPage.pageTitle).toBeVisible();

    // Grab item details
    const itemName = await inventoryPage.itemNameByIndex(0).textContent();
    const itemDesc = await inventoryPage.itemDescriptionByIndex(0).textContent();
    const itemPrice = await inventoryPage.itemPriceByIndex(0).textContent();

    await inventoryPage.addToCartButtonByIndex(0).click();
    await expect(inventoryPage.shoppingCartLink).toHaveText('1');
    await inventoryPage.shoppingCartLink.click();

    await expect(cartPage.pageTitle).toBeVisible();
    await expect(cartPage.inventoryItemByIndex(0)).toBeVisible();
    await cartPage.checkoutButton.click();

    await expect(checkoutStepOnePage.pageTitle).toBeVisible();
    await checkoutStepOnePage.firstNameInput.fill(firstName);
    await checkoutStepOnePage.lastNameInput.fill(lastName);
    await checkoutStepOnePage.zipCodeInput.fill(zipCode);
    await checkoutStepOnePage.continueButton.click();

    await expect(checkoutStepTwoPage.pageTitle).toBeVisible();
    await expect(checkoutStepTwoPage.itemNameByIndex(0)).toHaveText(itemName || 'default name');
    await expect(checkoutStepTwoPage.itemDescriptionByIndex(0)).toHaveText(itemDesc || 'default name');
    await expect(checkoutStepTwoPage.itemPriceByIndex(0)).toHaveText(itemPrice || 'default name');
    await expect(checkoutStepTwoPage.subtotal).toHaveText('Item total: ' + itemPrice || 'default name');

    await checkoutStepTwoPage.finishButton.click();
    await expect(checkoutCompletePage.pageTitle).toBeVisible();
    await expect(checkoutCompletePage.shoppingCartLink).toHaveText('');
    await expect(checkoutCompletePage.thankYouMessage).toBeVisible();
    await expect(checkoutCompletePage.confirmationMessage).toBeVisible();
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
});
