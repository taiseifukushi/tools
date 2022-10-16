// Data Format
// https://developers.google.com/chart/interactive/docs/gallery/histogram?hl=ja#data-format
import { BUS_HIKAKU_CSV_PATH } from "../bus_hikaku_crawler";

// const fs = require("fs");
// const csv = require("csv");

// const parse = require("csv-parse/lib/sync");
// const path = "tmp/bus_hikaku.csv";
// export const dataList = fs.createReadStream(path).pipe(csv.parse());

// export const DataTable = () => {
//     const parsedData = fs.createReadStream(BUS_HIKAKU_CSV_PATH).pipe(csv.parse());
//     console.log(parsedData);
//     return parsedData;
// };

// import * as d3 from "d3";

// d3.csv(BUS_HIKAKU_CSV_PATH, (data) => {
// 	console.log(data);
// });

export function sayHi(user: string) {
	return `Hello, ${user}!`;
}
