import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { BaseCrawler } from "./base_crawler";

export default class TestCrawler extends BaseCrawler {
	protected async crawl(_: Browser, page: Page) {
		await page
			.goto("https://www.pref.aomori.lg.jp/index.html")
			.then(() => page.waitForTimeout(1000));
	}
}
