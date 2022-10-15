import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { BaseCrawler } from "./utils/base_crawler";

export class BusHikakuCrawler extends BaseCrawler {
// export default class TestCrawler extends BaseCrawler {
	protected async crawl(_: Browser, page: Page) {
		// const url: string = "https://www.bushikaku.net/search/tokyo_aomori/?utm_source=google&utm_medium=cpc&utm_content=Bus_aomori_tokyo&utm_campaign=509_Bus&utm_term=%E9%AB%98%E9%80%9F%E3%83%90%E3%82%B9%20%E9%9D%92%E6%A3%AE%20-%20%E6%9D%B1%E4%BA%AC&external_inflow=listing&utm_media=google&gclid=CjwKCAjwkaSaBhA4EiwALBgQaNePtoQlN2msM8W10ptZugKpPA-CiVd-EIshQ1LNNuEyQPR5-98BVhoC2YcQAvD_BwE";
		// const url: string =	"https://www.bushikaku.net/search/tokyo_aomori/?utm_source=google&utm_medium=cpc&utm_content=Bus_aomori_tokyo&utm_campaign=509_Bus&utm_term=高速バス 青森 - 東京&external_inflow=listing&utm_media=google&gclid=CjwKCAjwkaSaBhA4EiwALBgQaNePtoQlN2msM8W10ptZugKpPA-CiVd-EIshQ1LNNuEyQPR5-98BVhoC2YcQAvD_BwE";
		const url: string =	"https://www.bushikaku.net/search/tokyo_aomori";
		await page.goto(url);
		await page.screenshot({ path: "tmp/bus_hikaku.png" });
	}
}
