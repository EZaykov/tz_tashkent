import { createServer } from "http";
import { getArgv } from "./argv";
import { requestListener } from "../requestListener";
import type { IPCMessage } from "./ipc";

const isChildProcess = process.connected;

if (isChildProcess) {
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	process.on("message", async(message: IPCMessage.ToChild) => {
		switch (message) {
			case "startTransport": {
				await exec({ port: parseInt(getArgv().port) });

				return process.send!("transportStarted" as IPCMessage.ToMaster);
			}

			default:
				throw new Error("unsupported IPC message");
		}
	});
}

export function exec(params: { port: number }): Promise<void> {
	const server = createServer(requestListener);

	return new Promise((resolve, reject) => {
		server.listen(params.port, () => {
			console.log(
				`server listening on port: ${params.port}. Process pid: ${process.pid}`
			);
			resolve();
		});
		server.once("error", reject);
	});
}
