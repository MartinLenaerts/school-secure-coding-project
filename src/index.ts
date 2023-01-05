import {dataSource} from "./lib/datasource";

async function run() {
    try {
        await dataSource.initialize();
    } catch (e) {
        console.error(e);
    }

}

void run();