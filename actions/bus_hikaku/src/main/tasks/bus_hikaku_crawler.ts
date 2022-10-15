import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { BaseCrawler } from "./utils/base_crawler";
const fs = require("fs");
const stringify = require("csv-stringify");
// https://observablehq.com/@d3/learn-d3-data?collection=@d3/learn-d3

interface Price {
	day: string;
	price: string;
}

export class BusHikakuCrawler extends BaseCrawler {
	protected async crawl(_: Browser, page: Page) {
		const url: string = "https://www.bushikaku.net/search/tokyo_aomori";
		await Promise.all([
			page.goto(url),
			page.waitForNavigation({
				waitUntil: "domcontentloaded",
				timeout: 30000,
			}),
		]);
		const priceTabaleSelector: string =
			"#j_sys_search_calender > table > tbody > tr";
		const extractionTable: string[][] = await page.$$eval(
			priceTabaleSelector,
			(rows) => {
				return Array.from(rows, (row) => {
					const columns = row.querySelectorAll("td");
					return Array.from(columns, (column) => column.innerText);
				});
			}
		);

		console.log("extractionTableです", extractionTable);
		let json = this.convertTextToJson(extractionTable);
		console.log("jsonです", json);
		let csv = this.convertJsonToCsv(json);
		console.log("csv", csv);
	}

	private convertTextToJson(table: Array<any>): any {
		let data = [];
		for (const elements of table) {
			for (const element of elements) {
				data.push(this.processingData(element));
			}
		}
		console.log("data", data);
		// [{ day: '25', price: '0' }, { day: '26', price: '0' }, ..., ...}]
		// [{"day":"25","price":"0"},{"day":"26","price":"0"}, , ..., ...}]
		return JSON.stringify(data);
	}

	private convertJsonToCsv(data: any): any {
		stringify(data, { header: false }, () => {
			const path = "tmp/basu_hikaku.csv";
			fs.writeFileSync(path);
		});
	}

	private processingData(text: string): Price {
		const array: string[] = text.split(/\n/);
		const day: string = array[0];
		const price: number = parseInt(array[1].replace(/,|円|ー/g, ""));
		const data: Price = {
			day: day,
			price: isNaN(price) ? "0" : `${price}`,
		};
		return data;
	}
}
