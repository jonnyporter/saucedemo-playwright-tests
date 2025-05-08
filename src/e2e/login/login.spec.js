// @ts-check
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/products/InventoryPage';

const username = 'standard_user';
const password = process.env.SAUCE_DEMO_PASS || '';

test('Login with valid credentials', async ({ page }) => {

    // Navigate to the login page
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Login with valid credentials
    await loginPage.usernameField.fill(username);
    await loginPage.passwordField.fill(password);
    await loginPage.loginButton.click();

    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.pageTitle).toBeVisible();
});

test('Attempt login with invalid credentials and verify appropriate error handling', async ({ page }) => {
    
    // Navigate to the login page
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    // Login with invalid creds
    await loginPage.usernameField.fill(username);
    await loginPage.passwordField.fill('invalid_password');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');

    // Login with empty password
    await loginPage.usernameField.fill(username);
    await loginPage.passwordField.fill('');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Password is required');

    // Login with empty username
    await loginPage.usernameField.fill('');
    await loginPage.passwordField.fill(password);
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');

    // Login with empty fields
    await loginPage.usernameField.fill('');
    await loginPage.passwordField.fill('');
    await loginPage.loginButton.click();
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText('Epic sadface: Username is required');
});
