import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { BaseCrawler } from "./utils/base_crawler";
const fs = require("fs");
const { Parser } = require("json2csv"); // https://github.com/zemirco/json2csv
// import * as d3 from "d3";
// import { Histogram } from "@d3/histogram"; // https://github.com/d3/d3 https://observablehq.com/@d3/learn-d3-data?collection=@d3/learn-d3

// https://developers.google.com/chart/interactive/docs/gallery/histogram?hl=ja#data-format
// Data Format

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

		const list = this.addTextToList(extractionTable);
		const csv_path = this.convertListToCsv(list);
		this.outCsvToHistogram(csv_path);
	}

	private outCsvToHistogram(csv_path: string): any {
		// hoge
		// const data = FileAttachment(csv_path).csv();
		// Histogram(data, { value: (d) => d.temperature, width, height });
	};

	private addTextToList(table: Array<any>): any {
		let List = [];
		for (const elements of table) {
			for (const element of elements) {
				const e = this.processingData(element);
				List.push(e);
			}
		}
		return List;
	}

	private convertListToCsv(jsonList: any): string {
		const fields = ["day", "price"];
		const json2csvParser = new Parser({
			fields,
			header: true,
		});
		const parsedCsv = json2csvParser.parse(jsonList);
		const path = "tmp/bas_hikaku.csv";
		fs.writeFileSync(path, parsedCsv);
		return path;
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
