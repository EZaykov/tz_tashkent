import { Service } from "../Service";
import { WSTransport } from "../Transport/WSTransport/WSTransport";
import { SingleMode } from "../Transport/HTTPTransport/Mode/SingleMode";
import genericParams from "./genericParams";

const service = new Service(
	new WSTransport(
		new SingleMode({
			port: genericParams.port
		})
	)
);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
service.start();
