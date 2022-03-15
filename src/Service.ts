import type { Transport } from "./Transport/Transport";

export class Service {
	public start(): Promise<void> {
		return this.transport.start();
	}

	constructor(private readonly transport: Transport) {}
}
