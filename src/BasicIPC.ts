import type { Worker } from "cluster";
import type { SendHandle } from "child_process";

export class BasicIPC<ToMaster extends string, ToChild extends string> {
	public sendMessageToAllChild(message: ToChild, payload?: SendHandle): void {
		for (const worker of this.workers) {
			this.sendMessageToChild(worker, message, payload);
		}
	}

	public async waitMessageFromAllChild(expectedMessage: ToMaster): Promise<void> {
		const promises: Promise<void>[] = [];

		for (const worker of this.workers) {
			promises.push(this.waitMessageFromChild(worker, expectedMessage));
		}

		await Promise.all(promises);
	}

	public sendMessageToChild(
		worker: Worker,
		message: ToChild,
		payload?: SendHandle
	): void {
		if (payload) {
			return void worker.send(message, payload);
		}

		worker.send(message);
	}

	public waitMessageFromChild(worker: Worker, expectedMessage: ToMaster): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			worker.once("message", (receivedMessage: string) => {
				if (receivedMessage === expectedMessage) {
					resolve();
				}
			});
			worker.once("error", reject);
		});
	}

	constructor(private readonly workers: Worker[]) {}
}
