import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseAdapter implements Connection {
	connection: any;

	constructor () {
		this.connection = pgp()("postgres://postgres:123@localhost:5432/pdi2023");
	}

	async query(statement: string, params: any): Promise<any> {
		return this.connection.query(statement, params);
	}

	async close(): Promise<void> {
		await this.connection.$pool.end();
	}

}