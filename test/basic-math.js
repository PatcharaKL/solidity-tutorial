const puppeteer = require("puppeteer");
const BASIC_MATH_URL = "http://localhost:3000/02-basic.html";
let browser, page;

const testSetup = () => {
  before(async () => {
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: [`--window-size=1200,800`],
    });
    page = await browser.newPage();
    await page.goto(BASIC_MATH_URL);
  });

  after(async () => {
    await page.close();
    await browser.close();
  });
}

const caseBuilder = (title, x, y, buttonID, expect) => {
  return {
    title: title,
    x: x,
    y: y,
    buttonID: buttonID,
    expect: expect,
  };
};

// Arrange
const It = caseBuilder
const tests = [
  It("should return the addition(+) result correctly", 10, 5, "#btn-add", 15),
  It("should return the subtraction(-) result correctly", 80, 5, "#btn-remove", 75),
  It("should return the multiply(*) result correctly", 10, 3, "#btn-multiply", 30),
  It("should return the divide(/) result correctly", 20, 2, "#btn-divide", 10),
  It("Should return Divide by zero", 20, 0, "#btn-divide", "revert Divide by zero"),
];

contract("BasicMath", () => {
  testSetup()

  tests.forEach(async (test) => {
    it(test.title, async () => {
      await inputData("#param1", test.x);
      await inputData('#param2', test.y);
      await clickBtn(test.buttonID);
      const actual = await getResult();

      await assert.equal(actual, test.expect);
    });
  });
});

// Helper
const inputData = async (textBoxID, value) => {
  const param1 = await page.waitForSelector(textBoxID);
  await param1.focus();
  await page.keyboard.type(String(value), { delay: 100 });
};
const clickBtn = async (btnID) => {
  const btnAdd = await page.waitForSelector(btnID);
  await btnAdd.click(); 
};
const getResult = async () => {
  await new Promise((done) => setTimeout(done, 100)) //? Wait for result to be display properly.
  const selectedElement = await page.waitForSelector("#result");
  const result = await selectedElement.evaluate((el) => el.textContent);
  return result;
};