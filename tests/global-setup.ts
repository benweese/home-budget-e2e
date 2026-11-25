import { execFileSync } from "node:child_process";
import path from "node:path";
import type { FullConfig } from "@playwright/test";

/**
 * Prints which home-budget commit is under test and what the server answers, so every run's output names it.
 * Locally Playwright may reuse a server already on the port; the health line shows that something answered.
 */
export default async function globalSetup(config: FullConfig): Promise<void> {
	const appDir = path.resolve(process.env.APP_DIR ?? "../home-budget");
	let sha = "unknown (not a git checkout)";
	try {
		sha = execFileSync("git", ["-C", appDir, "rev-parse", "HEAD"], { encoding: "utf8" }).trim();
	} catch {
		// keep "unknown"
	}
	console.log(`Testing home-budget at ${sha} (${appDir})`);
	const baseURL = config.projects[0]?.use.baseURL;
	if (baseURL) {
		const health = await fetch(`${baseURL}/api/health`).then(
			async (r) => `${String(r.status)} ${await r.text()}`,
			(e: unknown) => `no answer (${e instanceof Error ? e.message : String(e)})`,
		);
		console.log(`Server at ${baseURL}: /api/health → ${health}`);
	}
}
