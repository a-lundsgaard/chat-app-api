import pool from "..";
import { Pool, QueryResultRow, PoolClient } from "pg";
import { PubSub } from 'graphql-subscriptions';
import { events } from "../events/events";


// make abstract class that other controllers will inherit from
export abstract class Controller {
	pool: Pool;
	pubsub: PubSub;
	events = events

	constructor() {
		this.pool = pool;
		this.pubsub = new PubSub();
		this.events = events
	}
	// create a query method that will be used by other controllers
	// async query<T>(text: string, params?: T[]) {
	//   try {
	//     return await this.pool.query(text, params);
	//   } catch (err) {
	//     console.error(err);
	//     throw err;
	//   }
	// }

	async query<T extends QueryResultRow = any>(text: string, params?: any[]) {
		const client = await this.pool.connect()
		try {
			const result = await client.query<T>(text, params);
			return result.rows as T[];
		} catch (err) {
			console.error(err);
			throw err;
		}
		finally {
			client.release()
		}
	}

	async transaction<T>(
		callback: (client: PoolClient) => Promise<T>
	) {
		const client = await this.pool.connect();
		try {
			await client.query('BEGIN');
			const result = await callback(client); // pass client to callback
			await client.query('COMMIT');
			return result;
		}
		catch (e) {
			await client.query('ROLLBACK');
			throw e;
		}
		finally {
			client.release();
		}
	}

}