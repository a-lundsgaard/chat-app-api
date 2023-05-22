import pool from "..";
import fs from 'fs';
import path from 'path';


export class ScriptController {
    static async execute(fileName: string) {
        const script = fs.readFileSync(path.resolve(__dirname, `../sql/${fileName}.sql`)).toString();
        pool.query(script)
            .then(() => console.log(`Query successfully executed: ${fileName}`))
            .catch((err: unknown) => console.error(err));
    }
}
