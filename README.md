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
* **To Run All Tests:**
    ```bash
    npx playwright test
    ```
* **To Open The Report:** 
    ```bash
    npx playwright show-report
    ```

**Implementation Approach:**
My initial approach is to become familiar with the application by exploring (exploratory testing). Identify which pages lead to where and how things are put together. I then build out a folder structure that represents what I saw during the initial exploratory testing phase. I also ask Gemini to build a POM structure for me as a two man check to help me organize the POM and make sure I am not missing anything. I took a look at the priorities of what should be tested in the test implementation steps. I then begin to build out POM as I go through the tests building mostly what is needed, I use chrome dev tools, playwright locator pickers, recorders, and copilot autocomplete to help me write locators more quickly. As I go through tests I notice areas that could be improved or reused such as login, and adding items to cart could be broken out into a function that lives in the POM, I consider a refactor down the line. In the interest of time I automate the tests I can but plan to break out reused blocks of code into helper functions that could simplify automation in the future.

**Areas of Test Code Improvement:**
* The test case specifying to go through checkout process does not specify which parts of the checkout process should be verified. Coverage is missing in regards to taxes, where the zip code is should adjust what the taxes will be, and the price total calculated accordingly.

* The login test with valid credentials may be redundant as that flow is already tested in other scenarios.

* Items can be added to the shopping cart, the maximum limit of items that can be added is 6. The test case should be able to not only add different items to cart but also add multiple of the same items to the cart, but cannot because of limitations in the app.

* There should be a scenario that validates that sorted items can still be added to cart correctly.

* For product/inventory sorting I would like to add validation for not only the names and prices but the description and image as well that all elements of the cards are sorting with their designated cards.

* Setup and Teardown functions extend the length of time for each test but help to ensure a unique testing environment each time.

* Reset app state button needs it's own automated tests as it is fairly buggy and seems unreliable. We would want to ensure the reliablility of it if we are counting on it for test environment teardown.

**Areas of Application Improvement/Bugs:**
* No way to add additional quantity of items, add to cart button should not disappear on each item but instead shift over or there could be a quantity field on the item itself with a plus and minus button.

* Zip codes do not adjust taxes applied to total (but I understand this is a basic app).

* Checkout is possible with ZERO items in cart.

* Clicking back button after checkout shows previous pages as if checkout was occuring with zero items in cart.

* 'Reset app state' does not reset sorting but page reload does.

* 'Reset app state' does not revert 'Remove' buttons to 'Add to cart' buttons

* Login session is retained even when going back to login page, allowing for login an additional time.