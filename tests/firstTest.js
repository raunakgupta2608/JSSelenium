require("chromedriver"); // Include the chrome driver

const { Builder, By, Key } = require("selenium-webdriver");
const chai = require("chai");

async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://app-cus-myfracht-web-qa-001.azurewebsites.net/");

    const title = await driver.getTitle();
    chai.expect(title).to.be.equal("My Fracht");

    // Timeout to wait if connection is slow
    await driver.manage().setTimeouts({
      implicit: 10000, // 10 seconds
    });

    //Login Button
    await driver
      .findElement(By.xpath(`//*[@id="root"]/div/div/div/div/button`))
      .click();

    //SignIn code through internal user
    (async function () {
      await driver
        .findElement(By.css("#signInName"))
        .sendKeys("test.external@dofracht.com");
      await driver.findElement(By.css("#password")).sendKeys("test@123");
      await driver.findElement(By.css("#next")).click();

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
    })();
  } catch (error) {
    console.log("GALTI", error);
  } finally {
    setTimeout(async () => {
      await driver.quit();
    }, [25000]);
  }
}

example();
