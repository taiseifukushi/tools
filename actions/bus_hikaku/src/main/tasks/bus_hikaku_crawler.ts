import { Browser } from "puppeteer";
import { Page } from "puppeteer";
import { BaseCrawler } from "./utils/base_crawler";
// import { dataList } from "./utils/read_csv";
const fs = require("fs");
const { Parser } = require("json2csv"); // https://github.com/zemirco/json2csv
// const csv = require("csv");
// const parse = require("csv-parse/lib/sync");


interface Price {
	day: string;
	price: string;
}

export const BUS_HIKAKU_CSV_PATH: string = "tmp/bus_hikaku.csv";

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
		this.convertListToCsv(list);
		// const hoge = this.readCsvFile();
		// console.log(hoge);
	}

	// readCsvFile() {
	// 	const dataList = fs.readFileSync(BUS_HIKAKU_CSV_PATH);
	// 	const parseddataList = csv.parse(dataList, { columns: true });
	// 	console.log(dataList);
	// 	console.log(parseddataList);
	// 	return parseddataList;
	// };


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
		fs.writeFileSync(BUS_HIKAKU_CSV_PATH, parsedCsv);
		return BUS_HIKAKU_CSV_PATH;
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
