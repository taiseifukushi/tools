import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { BaseCrawler } from "./utils/base_crawler";
const fs = require("fs");
const { Parser } = require("json2csv");
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

		const json = this.convertTextToJson(extractionTable);
		const csv = this.convertJsonToCsv(json);
	}

	private convertTextToJson(table: Array<any>): any {
		let data = [];
		for (const elements of table) {
			for (const element of elements) {
				data.push(this.processingData(element));
			}
		}
		return JSON.stringify(data);
	}

	private convertJsonToCsv(json: any): any {
		const fields = [
			{ label: "day", value: "day" },
			{ label: "price", value: "price" },
		];
		console.log("開始");
		const json2csvParser = new Parser({
			fields,
			header: true
		});
		const parsedCsv = json2csvParser.parse(json);
		console.log(parsedCsv);
		const path = "tmp/basu_hikaku.csv";
		fs.writeFileSync(path, parsedCsv);
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
