import { WebSocketServer } from "ws";
import type { Server } from "http";
import { handle } from "../handle";
import type { IPCMessage } from "./ipc";

const isChildProcess = process.connected;

if (!isChildProcess) {
	throw new Error("should be called only by child process");
}

process.on("message", (message: IPCMessage.ToChild, server: Server) => {
	switch (message) {
		case "server":
			return void exec(server);

		default:
			throw new Error("unsupported IPC message");
	}
});

function exec(server: Server): void {
	const wsServer = new WebSocketServer({ server });

  console.log(`server passed to child process. Pid: ${process.pid}`);

	handle(wsServer);
}
