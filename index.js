const puppeteer = require("puppeteer");
const CREDENTIALS = require("./CREDENTIALS");

// Runs as cronjob, as honey-gain-cron in TaskScheduler.

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.goto("https://dashboard.honeygain.com/login");
    console.log("Inputing username");
    await page.waitForSelector('input[type="email"]');
    await page.type('input[type="email"]', CREDENTIALS.USER_NAME);
    console.log("Inputing pwd");
    await page.waitForSelector('input[type="password"]', { visible: true });
    await page.type('input[type="password"]', CREDENTIALS.PWD);
    console.log("clicking login");
    await page.click(".sc-bdVaJa.jBigVe");
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    await page.click('[type="submit"]');

    //document.querySelectorAll("form");
    await page.waitForNavigation();
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // make date string:
    const currentDate = new Date();
    let dateString = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;
    await page.screenshot({ path: `screenshot ${dateString}.png` });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await browser.close();
})();
