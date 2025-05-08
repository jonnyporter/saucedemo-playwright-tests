# saucedemo-playwright-tests

Project Setup
1. **Clone the project:**

2.  **Install Dependencies:**
    ```bash
    npm install   # or yarn install or pnpm install
    ```
    This command installs all the necessary packages, including Playwright.

3.  **Install Playwright Browsers (if needed):**
    ```bash
    npx playwright install
    ```
    This will download the browsers Playwright can automate (Chromium, Firefox, and WebKit).

**Optional Next Steps:**

* **Review Configuration:** Check the `playwright.config.js` file to understand the project's settings.
* **Run Example Tests:** Try running the initial tests to verify your setup:
    ```bash
    npx playwright test --ui
    ```


**Areas of Improvement:**
No way to add additional quantity of items, add to cart button should not disappear on each item but instead shift over or there could be a quantity field on the item itself with a plus and minus button.