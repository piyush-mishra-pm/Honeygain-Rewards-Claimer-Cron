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
    await page.waitForSelector(".sc-bdVaJa.jBigVe");
    await page.click(".sc-bdVaJa.jBigVe");
    await page.click('[type="submit"]');

    await page.waitForNavigation();

    // wait for banner to appear.
    //await new Promise((resolve) => setTimeout(resolve, 4000));
    await page.waitForXPath("//span[contains(., 'Try Your Luck!')]");
    const [span] = await page.$x("//span[contains(., 'Try Your Luck!')]");
    if (span) {
        await span.click();
    }

    // wait for the confirm button to appear.
    await page.waitForXPath("//span[contains(., 'Open')]");
    const [openSpan] = await page.$x("//span[contains(., 'Open')]");
    if (openSpan) {
        await openSpan.click();
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
    await browser.close();
})();
