require("chromedriver"); // Include the chrome driver
const { By } = require("selenium-webdriver");
const chai = require("chai");

const executeDriverCreation = require("../CommonFunctionalities/createDriver");

async function example() {
  let drive;
  try {
    const { driver } = await executeDriverCreation();
    drive = driver;

    if (driver) {
      const sidebar = await driver
        .findElement(By.css("div.sidebar"))
        .getTagName();

      chai.expect(sidebar).to.be.equal("div");

      const expandedFrachtLogo = await driver.findElement(By.css("img.jss13"));

      chai.expect(await expandedFrachtLogo.getTagName()).to.be.equal("img");

      chai
        .expect(await expandedFrachtLogo.getAttribute("data-testid"))
        .to.be.equal("sidebarImage");

      chai
        .expect(await expandedFrachtLogo.getCssValue("object-fit"))
        .to.be.equal("contain");

      const sidebarToggleIcon = await driver.findElement(By.css("img.jss7"));

      chai.expect(await sidebarToggleIcon.getTagName()).to.be.equal("img");
      chai
        .expect(await sidebarToggleIcon.getAttribute("alt"))
        .to.be.equal("KeyboardArrowLeftIcon");

      sidebarToggleIcon.click();

      chai
        .expect(await sidebarToggleIcon.getAttribute("alt"))
        .to.be.equal("KeyboardArrowRightIcon");

      const outsideProfilePic = await driver.findElement(
        By.css("svg.MuiSvgIcon-root")
      );

      outsideProfilePic.click();
      chai.expect(await outsideProfilePic.getTagName()).to.be.equal("svg");

      const signOut = await driver.findElements(By.css("p.MuiTypography-root"));

      signOut.forEach(async (ele, index) => {
        if (index > 1) {
          const temp = await ele.getAttribute("innerHTML");
          chai
            .expect(temp)
            .to.contain.oneOf(["View Profile", "User Management", "Sign Out"]);
        }
      });
    }
  } catch (error) {
    console.log("GALATI IN toggleButtonAndProfileCheck", error);
  } finally {
    setTimeout(async () => {
      await drive.quit();
    }, [1000]);
  }
}

example();
