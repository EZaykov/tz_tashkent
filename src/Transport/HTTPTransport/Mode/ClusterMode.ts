import * as _ from "lodash";
import * as _cluster from "cluster";
import type { Worker } from "cluster";
import type { Mode } from "./Mode";
import { BasicIPC } from "../../../BasicIPC";
import type { IPCMessage } from "../worker/ipc";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cluster: typeof _cluster.default = _cluster as any;

export class ClusterMode implements Mode {
	public async start(): Promise<void> {
		const workers = this.startWorkers();
		const ipc = new BasicIPC<IPCMessage.ToMaster, IPCMessage.ToChild>(workers);

		ipc.sendMessageToAllChild("startTransport");
		await ipc.waitMessageFromAllChild("transportStarted");
	}

	constructor(
		private readonly params: {
			port: number;
			worker: {
				execPath: string;
				count: number;
			};
		}
	) {
		cluster.setupMaster({
			exec: this.params.worker.execPath,
			args: ["--port", this.params.port.toString()]
		});
	}

	private startWorkers(): Worker[] {
		return _.times(this.params.worker.count, () => cluster.fork());
	}
}
