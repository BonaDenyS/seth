const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function loginTest() {
    // Set up the Chrome WebDriver
    let options = new chrome.Options();
    let driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
        // Navigate to the login page
        await driver.get('http://localhost:3000/login.html');
        
        // Find the username field and enter a valid username
        let usernameField = await driver.findElement(By.id('username'));
        await usernameField.sendKeys('validUsername');
        
        // Find the password field and enter a valid password
        let passwordField = await driver.findElement(By.id('password'));
        await passwordField.sendKeys('validPassword');
        
        // Find the login button and click it
        let loginButton = await driver.findElement(By.id('loginButton'));
        await loginButton.click();
        
        // Wait for the popup alert to be displayed
        await driver.wait(until.alertIsPresent(), 5000);
        
        // Optionally, you can accept the alert to complete the test
        let alert = await driver.switchTo().alert();
        await alert.accept();
        
        console.log('Test Passed: Alert displayed successfully.');
    } catch (error) {
        console.error('Test Failed:', error);
    } finally {
        // Close the browser
        await driver.quit();
    }
})();
