import * as yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const getArgv = (): ARGV => yargs(hideBin(process.argv)).argv as unknown as ARGV;

interface ARGV {
	port: string;
}
