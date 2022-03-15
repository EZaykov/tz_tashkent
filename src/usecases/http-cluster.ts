import * as os from "os";
import * as path from "path";
import { Service } from "../Service";
import { HTTPTransport } from "../Transport/HTTPTransport/HTTPTransport";
import { ClusterMode } from "../Transport/HTTPTransport/Mode/ClusterMode";
import genericParams from "./genericParams";

const clusterParams = {
	workerCount: os.cpus().length,
	workerExecPath: path.resolve(
		process.cwd(),
		"src",
		"Transport",
		"HTTPTransport",
		"worker",
		"exec"
	)
};
const service = new Service(
	new HTTPTransport(
		new ClusterMode({
			port: genericParams.port,
			worker: {
				count: clusterParams.workerCount,
				execPath: clusterParams.workerExecPath
			}
		})
	)
);

// eslint-disable-next-line @typescript-eslint/no-floating-promises
service.start();
