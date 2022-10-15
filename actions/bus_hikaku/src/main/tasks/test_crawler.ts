import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { BaseCrawler } from "./utils/base_crawler";

export class TestCrawler extends BaseCrawler {
// export default class TestCrawler extends BaseCrawler {
	protected async crawl(_: Browser, page: Page) {
		const url: string = "https://www.hkdballpark.com/";
		await page.goto(url);
		await page.screenshot({ path: "tmp/test_crawler.png" });
	}
}
