import {AppDataSource} from "./lib/datasource";


async function run() {
    try {
        await AppDataSource.initialize();
    } catch (e) {
        console.error(e);
    }

}

void run();