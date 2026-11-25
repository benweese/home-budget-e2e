import { execFileSync } from "node:child_process";
import path from "node:path";

/** Prints which home-budget commit is under test, so every run's output names it. */
export default function globalSetup(): void {
	const appDir = path.resolve(process.env.APP_DIR ?? "../home-budget");
	let sha = "unknown (not a git checkout)";
	try {
		sha = execFileSync("git", ["-C", appDir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
	} catch {
		// keep "unknown"
	}
	console.log(`Testing home-budget at ${sha} (${appDir})`);
}
