const puppeteer_sample = require("puppeteer");

(async () => {
	const browser = await puppeteer_sample.launch();
	const page = await browser.newPage();
	await page.goto("https://google.com");
	await page.screenshot({ path: "out/sample.png" });
	await browser.close();
})();

// npx ts-node src/main/sample.ts
