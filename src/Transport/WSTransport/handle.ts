/* eslint-disable @typescript-eslint/no-unused-vars */
import type { WebSocketServer } from "ws";

export const handle = (server: WebSocketServer): void => {
	server.on("connection", (socket) => {

    // както обрабатываем общение сокетов
	});
};
