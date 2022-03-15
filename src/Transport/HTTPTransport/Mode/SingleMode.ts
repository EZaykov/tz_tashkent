import { exec as startWorker } from "../worker/exec";
import type { Mode } from "./Mode";

export class SingleMode implements Mode {
	public async start(): Promise<void> {
		await startWorker({ port: this.params.port });

		return;
	}

	constructor(protected readonly params: { port: number }) {}
}
