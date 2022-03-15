import { Service } from "../Service";
import { HTTPTransport } from "../Transport/HTTPTransport/HTTPTransport";
import { SingleMode } from "../Transport/HTTPTransport/Mode/SingleMode";
import genericParams from "./genericParams";

const service = new Service(
	new HTTPTransport(
		new SingleMode({
			port: genericParams.port
		})
	)
);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
service.start();
