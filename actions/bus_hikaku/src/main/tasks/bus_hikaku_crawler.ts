import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { BaseCrawler } from "./utils/base_crawler";
const fs = require("fs");
// import { generate } from "csv-generate";
// const stringify = require("csv-stringify/lib/sync");
// import { Stringify } from "csv-stringify/sync";
const stringify = require("csv-stringify");
// https://observablehq.com/@d3/learn-d3-data?collection=@d3/learn-d3

interface Price {
	day: number;
	price: number;
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

		console.log(extractionTable);
		let json = this.convertTextToJson(extractionTable);
		let csv = this.convertJsonToCsv(json);
		console.log(csv);
	}

	private convertTextToJson(table: any): any {
		let _data = [];
		for (const elements of table) {
			for (const element of elements) {
				_data.push(this.processingData(element));
			}
		}
		return JSON.stringify(_data);
	}

	private convertJsonToCsv(data: any): any {
		Stringify(data, { header: false }, () => {
			const path = "tmp/basu_hikaku.csv";
			fs.writeFileSync(path);
		});
	}

	// 三次元配列の型定義が分からない
	// private processingExtractionTabale(table: string[][]): any {
	// 	const processedTable = () => {
	// 		for (const elements of table) {
	// 			return Array.from(table, (elements) => {
	// 				const _array = () =>{
	// 					for (const element of elements) {
	// 						return Array.from(elements, (element) => {
	// 							return this.processingText(element);
	// 						});
	// 					}
	// 				}
	// 				return _array;
	// 			});
	// 		}
	// 	}
	// 	return processedTable;
	// 	// return Array.from(table, (elements) => {
	// 	// 	for (const elements of table) {
	// 	// 		return Array.from(elements, (element) => {
	// 	// 			for (const element of elements) {
	// 	// 				return this.processingText(element);
	// 	// 			}
	// 	// 		});
	// 	// 	}
	// 	// });
	// }

	private processingData(text: string): Price {
		let array: string[] = text.split(/\n/);
		let day: number = parseInt(array[0]);
		let price: number = parseInt(array[1].replace(/,|円/g, ""));
		let _data: Price = {
			day: day,
			price: price,
		};
		return _data;
	}
}
