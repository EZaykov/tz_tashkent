import type { Transport } from "../Transport";
import type { Mode } from "./Mode/Mode";

export class WSTransport implements Transport {
	public start(): Promise<void> {
		return this.mode.start();
	}

	constructor(private readonly mode: Mode) {}
}
