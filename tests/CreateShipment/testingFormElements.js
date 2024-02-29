//node tests/CreateShipment/testingFormElements.js

require("chromedriver"); // Include the chrome driver
const { By, until } = require("selenium-webdriver");
const chai = require("chai");

const executeDriverCreation = require("../CommonFunctionalities/createDriver");

async function example() {
  let drive;
  try {
    const { driver } = await executeDriverCreation();
    drive = driver;

    if (driver) {
      //   await driver
      //     .wait(
      //       until.elementLocated(By.css("img[alt='CreateShipmentIcon']")),
      //       99999
      //     )
      //     .click();
      await driver.findElement(By.css("img[alt='CreateShipmentIcon']")).click();

      const breadCrumb = await driver.findElement(
        By.linkText("Create Shipment")
      );

      chai.expect(await breadCrumb.getText()).to.be.equal("Create Shipment");

      const pageHeader = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll("h2.MuiTypography-root")[0];
        })
      );

      chai
        .expect(await pageHeader.getText())
        .to.be.equal("SHIPMENT ONLINE BOOKING");
      chai
        .expect(await pageHeader.getCssValue("color"))
        .to.be.equal("rgba(24, 54, 80, 1)");

      const shipperAccordianText = await driver.findElement(
        By.css("div#panel1a-shipper p")
      );

      chai.expect(await shipperAccordianText.getText()).to.be.equal("Shipper");
      await shipperAccordianText.click();

      const shipperNameLabel = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label"
          )[0];
        })
      );
      chai.expect(await shipperNameLabel.getText()).to.be.equal("Name");

      const shipperNameInput = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label + div input"
          )[0];
        })
      );
      chai
        .expect(await shipperNameInput.getAttribute("disabled"))
        .to.be.equal("true");

      const shipperAddress1Label = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label"
          )[1];
        })
      );
      chai
        .expect(await shipperAddress1Label.getText())
        .to.be.equal("Address 1");

      const shipperAddress1Input = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label + div input"
          )[1];
        })
      );
      chai
        .expect(await shipperAddress1Input.getAttribute("disabled"))
        .to.be.equal("true");

      const shipperAddress2Label = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label"
          )[2];
        })
      );
      chai
        .expect(await shipperAddress2Label.getText())
        .to.be.equal("Address 2");

      const shipperAddress2Input = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label + div input"
          )[2];
        })
      );
      chai
        .expect(await shipperAddress2Input.getAttribute("disabled"))
        .to.be.equal("true");

      const shipperCityLabel = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label"
          )[3];
        })
      );
      chai.expect(await shipperCityLabel.getText()).to.be.equal("City");

      const shipperCityInput = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label + div input"
          )[3];
        })
      );
      chai
        .expect(await shipperCityInput.getAttribute("disabled"))
        .to.be.equal("true");

      const shipperStateLabel = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label"
          )[4];
        })
      );
      chai
        .expect(await shipperStateLabel.getText())
        .to.be.equal("State/Province");

      const shipperStateInput = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label + div input"
          )[4];
        })
      );
      chai
        .expect(await shipperStateInput.getAttribute("disabled"))
        .to.be.equal("true");

      const shipperZipCodeLabel = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label"
          )[5];
        })
      );
      chai.expect(await shipperZipCodeLabel.getText()).to.be.equal("Zip Code");

      const shipperZipCodeInput = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label + div input"
          )[5];
        })
      );
      chai
        .expect(await shipperZipCodeInput.getAttribute("disabled"))
        .to.be.equal("true");

      const shipperCountryLabel = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label"
          )[6];
        })
      );
      chai.expect(await shipperCountryLabel.getText()).to.be.equal("Country");

      const shipperCountryInput = await driver.findElement(
        By.js(function () {
          return document.querySelectorAll(
            "div[aria-labelledby='panel1a-shipper'] label + div input"
          )[6];
        })
      );
      chai
        .expect(await shipperCountryInput.getAttribute("disabled"))
        .to.be.equal("true");

      // await driver
      //   .findElement(
      //     By.css("div[role='presentation'] ul li[data-option-index='0']")
      //   )
      //   .click();

      const labelsArray = await driver.findElements(
        By.js(function () {
          return document.querySelectorAll("div.MuiFormControl-root label");
        })
      );

      const refNoLabel = labelsArray.filter(
        async (ele) => (await ele.getText()) === "Reference Number *"
      );
      console.log("refNoLabel", refNoLabel);
      // chai.expect(await refNoLabel).to.be.equal("Reference Number *");

      const radioButtons = await driver.findElements(
        By.js(function () {
          return document.querySelectorAll("input[type='radio']");
        })
      );

      radioButtons.forEach(async (element) => {
        const val = await element.getAttribute("value");
        chai.expect(val).to.contain.oneOf(["Import", "Export"]);

        console.log("val", await element.getAttribute("checked"));

        // switch (val) {
        //   case "Import":
        //     chai
        //       .expect(await element.getAttribute("check"))
        //       .to.be.equal("false");
        //     break;
        //   case "Export":
        //     chai
        //       .expect(await element.getAttribute("check"))
        //       .to.be.equal("true");
        //     break;

        //   default:
        //     break;
        // }
      });

      // refNoLabel.sendKeys("A909");

      // await driver
      //   .findElement(
      //     By.js(function () {
      //       return document.querySelectorAll(
      //         "div[role='presentation'] ul li[data-option-index='0']"
      //       )[0];
      //     })
      //   )
      //   .click();

      //   signOut.forEach(async (ele, index) => {
      //     if (index > 1) {
      //       const temp = await ele.getAttribute("innerHTML");
      //       chai
      //         .expect(temp)
      //         .to.contain.oneOf(["View Profile", "User Management", "Sign Out"]);
      //     }
      //   });
    }
  } catch (error) {
    console.log("GALATI IN testignFormElements", error);
  } finally {
    setTimeout(async () => {
      await drive.quit();
    }, [1000]);
  }
}

example();
