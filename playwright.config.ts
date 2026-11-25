import path from "node:path";
import { defineConfig, devices } from "@playwright/test";

/**
 * End-to-end tests for home-budget, run against its local `wrangler dev` (never production). APP_DIR points
 * at a home-budget checkout that has been built (`npm ci && npm run app:build`); default: ../home-budget.
 */
const APP_DIR = path.resolve(process.env.APP_DIR ?? "../home-budget");
const PORT = Number(process.env.APP_PORT ?? 8787);
const baseURL = `http://127.0.0.1:${String(PORT)}`;

export default defineConfig({
	testDir: "./tests",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: 0,
	reporter: process.env.CI ? [["github"], ["list"], ["html", { open: "never" }]] : [["list"]],
	globalSetup: "./tests/global-setup.ts",
	use: { baseURL, trace: "retain-on-failure", colorScheme: "dark" },
	projects: [
		// Device-specific tests are tagged @iphone-only / @desktop-only; each project leaves out the others' tags.
		{ name: "iphone", use: { ...devices["iPhone 15"] }, grepInvert: /@desktop-only/ },
		{ name: "ipad", use: { ...devices["iPad Pro 11"] }, grepInvert: /@(desktop|iphone)-only/ },
		{
			name: "desktop",
			use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
			grepInvert: /@iphone-only/,
		},
	],
	webServer: {
		command: `npx --no-install wrangler dev --port ${String(PORT)} --ip 127.0.0.1 --log-level warn`,
		cwd: path.join(APP_DIR, "apps/worker"),
		url: `${baseURL}/api/health`,
		reuseExistingServer: !process.env.CI,
		timeout: 120_000,
		env: { WRANGLER_SEND_METRICS: "false" },
	},
});
