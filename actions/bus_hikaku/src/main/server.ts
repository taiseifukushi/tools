import http from "http";
const port = 3001;
const host = "127.0.0.1";
const fs = require("fs");

const server = http.createServer((_req: any, res: any) => {
	fs.readFile("src/main/index.html", (_err: any, data: any) => {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(data);
		res.end();
	});
});
console.log("start");
server.listen(port, host);

// npx ts-node src/main/server.ts
// npm run server
// http://127.0.0.1:3001/
