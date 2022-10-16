import { Tasks } from "./tasks/_tasks";

async function executeTasks(){
	for (const task of Tasks) {
		const crawler = new task();
		await crawler.run();
	}
}

executeTasks();
