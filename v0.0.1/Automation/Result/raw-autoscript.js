
const { Builder, By, Key, until } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('http://localhost:3000/login.html');

    // Find username field
    let usernameField = await driver.findElement(By.id('username'));

    // Enter username
    await usernameField.sendKeys('username');

    // Find password field
    let passwordField = await driver.findElement(By.id('password'));

    // Enter password
    await passwordField.sendKeys('password');

    // Find login button
    let loginButton = await driver.findElement(By.id('loginButton'));

    // Click login button
    await loginButton.click();

    // Wait until alert is displayed
    await driver.wait(until.alertIsPresent());
    
    // Get alert text
    let alert = await driver.switchTo().alert();
    let alertText = await alert.getText();
    console.log('Alert text:', alertText);
    
    // Close alert
    await driver.sleep(10000);
    await alert.accept();
  } finally {
    await driver.quit();
  }
})();
