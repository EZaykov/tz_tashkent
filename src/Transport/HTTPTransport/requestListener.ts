/* eslint-disable @typescript-eslint/no-unused-vars */
import type { RequestListener, IncomingMessage, ServerResponse } from "http";

export const requestListener: RequestListener = (
	message: IncomingMessage,
	response: ServerResponse
) => {
	// както обрабатываем запросы

  response.end();
};
