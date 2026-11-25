// Runs the suite inside the official Playwright image (Ubuntu), for machines where Playwright's WebKit isn't
// officially supported (e.g. Fedora). Same browsers as CI. Usage: npm run test:docker [-- playwright args]
// APP_DIR (default ../home-budget) must be a built home-budget checkout; it's mounted at /app.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const image = readFileSync(path.join(root, ".github/docker/playwright/Dockerfile"), "utf8").match(
	/^FROM (\S+)/m,
)?.[1];
const imageVersion = image?.match(/:v(\d+\.\d+\.\d+)/)?.[1];
const pkg = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const wanted = pkg.devDependencies["@playwright/test"];
if (!image || imageVersion !== wanted) {
	console.error(
		`Docker image ${image ?? "(none)"} doesn't match @playwright/test ${wanted}. Update .github/docker/playwright/Dockerfile.`,
	);
	process.exit(1);
}
const appDir = path.resolve(root, process.env.APP_DIR ?? "../home-budget");
const user =
	typeof process.getuid === "function" ? ["--user", `${process.getuid()}:${process.getgid()}`] : [];
const result = spawnSync(
	"docker",
	[
		"run",
		"--rm",
		"--init",
		"--ipc=host",
		...user,
		"-e",
		"HOME=/tmp",
		"-e",
		"APP_DIR=/app",
		"-e",
		"CI=",
		"-v",
		`${root}:/work`,
		"-v",
		`${appDir}:/app`,
		"-w",
		"/work",
		image,
		"npx",
		"--no-install",
		"playwright",
		"test",
		...process.argv.slice(2),
	],
	{ stdio: "inherit" },
);
process.exit(result.status ?? 1);
