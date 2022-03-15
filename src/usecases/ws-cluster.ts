import * as os from "os";
import * as path from "path";
import { Service } from "../Service";
import { WSTransport } from "../Transport/WSTransport/WSTransport";
import { ClusterMode } from "../Transport/WSTransport/Mode/ClusterMode";
import genericParams from "./genericParams";

const clusterParams = {
	workerCount: os.cpus().length,
	workerExecPath: path.resolve(
		process.cwd(),
		"src",
		"Transport",
		"WSTransport",
		"worker",
		"exec"
	)
};
const service = new Service(
	new WSTransport(
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
