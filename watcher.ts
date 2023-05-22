import fs from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';

const sqlFolder = './src/database/sql';
const gqlFolder = './src/graphql/schemas';

const sleep = promisify(setTimeout);

async function watchOnce(dir: string, cmd: string) {
    const watcher = fs.watch(dir, async (evt, file) => {
        watcher.close();

        try {
            // execute command
            const { stdout } = await promisify(exec)(cmd);
            console.log(stdout);
        } catch (err) {
            console.error(err);
        }

        // resurrect watcher after 1 sec
        await sleep(1000);
        await watchOnce(dir, cmd);
    });
}

async function watchOnceGQL() {
    await watchOnce(gqlFolder, 'npm run codegen');
}

async function watchOnceSQL() {
    await watchOnce(sqlFolder, 'npm run mac:copy:sql');
}

watchOnceGQL();
watchOnceSQL();
