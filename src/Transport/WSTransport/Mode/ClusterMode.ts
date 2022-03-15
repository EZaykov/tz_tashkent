import * as _ from "lodash";
import * as _cluster from "cluster";
import type { Worker } from "cluster";
import { SingleMode } from "./SingleMode";
import { BasicIPC } from "../../../BasicIPC";
import type { IPCMessage } from "../worker/ipc";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cluster: typeof _cluster.default = _cluster as any;

export class ClusterMode extends SingleMode {
	public async start(): Promise<void> {
		const httpServer = await this.startHttpServer();
		const workers = this.startWorkers();
		const ipc = new BasicIPC<string, IPCMessage.ToChild>(workers);

		ipc.sendMessageToAllChild("server", httpServer);
	}

	constructor(params: {
		port: number;
		worker: {
			execPath: string;
			count: number;
		};
	}) {
		super({ port: params.port });
		this.workerParams = params.worker;
		cluster.setupMaster({
			exec: this.workerParams.execPath
		});
	}

	private readonly workerParams: {
		execPath: string;
		count: number;
	};

	private startWorkers(): Worker[] {
		return _.times(this.workerParams.count, () => cluster.fork());
	}
}
