// * BasicMath automate testing by 'puppeteer' and 'mocha'
// * This test file follow AAA testing pattern (Arrange, Act, Assert)
// * and refactored to use testing table

const puppeteer = require("puppeteer");
const SKIP = true;
const delayDuration = 500
const BASIC_MATH_URL = "http://localhost:3000/02-basic.html";
let browser, page;

const delay = (ms) => new Promise((done) => setTimeout(done, ms));

const testSetup = () => {
  before(async () => {
    browser = await puppeteer.launch({
      headless: SKIP,
      defaultViewport: null,
      args: [`--window-size=1200,800`],
    });
    page = await browser.newPage();
    await page.goto(BASIC_MATH_URL);
  });
  beforeEach(async () => {
    const result = await page.waitForSelector('#result')
    await result.evaluate(el => el.textContent = '')
  })
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

// * (1) Arrange
const It = caseBuilder // for readability
const testCases = [
  It("should return the addition(+) result correctly", 10, 5, "#btn-add", 15),
  It("should return the subtraction(-) result correctly", 80, 5, "#btn-remove", 75),
  It("should return the multiply(*) result correctly", 10, 3, "#btn-multiply", 30),
  It("should return the divide(/) result correctly", 20, 2, "#btn-divide", 10),
  //...
];

contract("BasicMath", () => {
  testSetup()
  testCases.forEach(async (test) => {
    // * Test table
    it(test.title, async () => {
      // * (2) Act
      await inputData("#param1", test.x);
      await inputData('#param2', test.y);
      await clickBtn(test.buttonID);
      const actual = await getResult();
      // * (3) Assert
      await assert.equal(actual, test.expect);
    });
  });

  it("should return 100 when 'SUM' args is 10,20,30,40", async ()=>{
    const expect = 100
    await inputData('#agg-param', '10 20 30 40')
    await clickBtn('#btn-sum')
    const actual = await getResult();
    await assert.equal(actual, expect)
  })
  it("should return 10 when 'MIN' args is 10,20,30,40", async ()=>{
    const expect = 10
    await inputData('#agg-param', '10 20 30 40')
    await clickBtn('#btn-min')
    const actual = await getResult();
    await assert.equal(actual, expect)
  })
  it("should return 40 when 'MAX' args is 10,20,30,40", async ()=>{
    const expect = 40
    await inputData('#agg-param', '10 20 30 40')
    await clickBtn('#btn-max')
    const actual = await getResult();
    await assert.equal(actual, expect)
  })
  it("should return 25 when 'MEAN' args is 10,20,30,40", async ()=>{
    const expect = 25
    await inputData('#agg-param', '10 20 30 40')
    await clickBtn('#btn-mean')
    const actual = await getResult();
    await assert.equal(actual, expect)
  })
});

// Client action
const inputData = async (textBoxID, value) => {
  const kbDelay = SKIP ? {} : {delay: 100};
  if (!SKIP) {
    await delay(delayDuration)
  }
  const param1 = await page.waitForSelector(textBoxID);
  await param1.focus();
  await page.keyboard.type(String(value), kbDelay);
};
const clickBtn = async (btnID) => {
  if (!SKIP) {
    await delay(delayDuration)
  }
  const btnAdd = await page.waitForSelector(btnID);
  await btnAdd.click();
};

// Helper
const getResult = async () => {
  const waitForResult = SKIP ? 100 : delayDuration
  await delay(waitForResult)
  const selectedElement = await page.waitForSelector("#result");
  const result = await selectedElement.evaluate((el) => el.textContent);
  return result;
};