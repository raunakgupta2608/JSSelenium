require("chromedriver"); // Include the chrome driver

const { Builder } = require("selenium-webdriver");
const login = require("./loginScript");

async function executeDriverCreation() {
  return new Promise(async (resolve, reject) => {
    try {
      let driver = await new Builder().forBrowser("chrome").build();

      // Timeout to wait if connection is slow
      await driver.manage().setTimeouts({
        implicit: 30000, // 10 seconds
      });

      // driver

      const isLoginSuccess = await login(driver);

      isLoginSuccess
        ? resolve({
            driver,
          })
        : reject({
            driver: null,
          });
    } catch (error) {
      console.log("GALATI IN createDriver", error);
      reject({
        driver: null,
      });
    }
  });
}

module.exports = executeDriverCreation;
