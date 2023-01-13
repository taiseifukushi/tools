import puppeteer from "puppeteer";
import { Browser } from "puppeteer";
import { Page } from "puppeteer";

export interface Crawler {
	run(): Promise<void>;
}

export abstract class BaseCrawler implements Crawler {
	async run(): Promise<void> {
		const browser = await puppeteer.launch();
		const _page = await browser.newPage();
		console.log(this);
		await this.crawl(browser, _page);
		await browser.close();
	}

	protected abstract crawl(browser: Browser, page: Page): any;
}
