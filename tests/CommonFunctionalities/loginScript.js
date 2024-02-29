require("chromedriver"); // Include the chrome driver

const { Builder, By, Key } = require("selenium-webdriver");
const chai = require("chai");

async function login(driver) {
  //   let driver = await new Builder().forBrowser("chrome").build();

  return new Promise(async (resolve, reject) => {
    try {
      await driver.get(
        "https://app-cus-myfracht-web-qa-001.azurewebsites.net/"
      );

      const title = await driver.getTitle();
      chai.expect(title).to.be.equal("My Fracht");

      // Timeout to wait if connection is slow
      await driver.manage().setTimeouts({
        implicit: 99999, // 10 seconds
      });

      //Login Button
      await driver
        .findElement(By.xpath(`//*[@id="root"]/div/div/div/div/button`))
        .click();

      //SignIn code through internal user

      await driver
        .findElement(By.css("#signInName"))
        .sendKeys("test.external@dofracht.com");
      await driver.findElement(By.css("#password")).sendKeys("test@123");
      driver
        .findElement(By.css("#next"))
        .click()
        .then(() => {
          resolve(true);
        });
    } catch (error) {
      console.log("GALATI IN loginScript", error);
      reject(false);
    }
  });
}

module.exports = login;
