import type { Server } from "http";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { handle } from "../handle";
import type { Mode } from "./Mode";

export class SingleMode implements Mode {
	public async start(): Promise<void> {
		const httpServer = await this.startHttpServer();
		const wsServer = new WebSocketServer({ server: httpServer });

		handle(wsServer);
	}

	constructor(protected readonly params: { port: number }) {}

	protected async startHttpServer(): Promise<Server> {
		const server = createServer();

		return new Promise<Server>((resolve, reject) => {
			server.listen(this.params.port, () => {
				console.log(
					`server listening on port: ${this.params.port}. Process pid: ${process.pid}`
				);
				resolve(server);
			});
			server.once("error", reject);
		});
	}
}
