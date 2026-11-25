import { expect, test } from "@playwright/test";

const token = (name: string) =>
	`getComputedStyle(document.documentElement).getPropertyValue("${name}").trim()`;

test.describe("reader settings", { tag: "@a11y" }, () => {
	test(
		"#0008 Increase Contrast (prefers-contrast: more) turns muted text full white",
		{ tag: "@iphone-only" },
		async ({ page }) => {
			await page.goto("/");
			const normal = await page.evaluate(token("--hb-color-text-muted"));
			await page.emulateMedia({ contrast: "more" });
			const more = await page.evaluate(token("--hb-color-text-muted"));
			// Proves the emulation reaches WebKit: the token must actually change, to the full text colour.
			expect(normal).toBe("#9aa3ad");
			expect(more).toBe(await page.evaluate(token("--hb-color-text")));
		},
	);

	test(
		"#0009 the largest text size (310%) never scrolls sideways",
		{ tag: "@iphone-only" },
		async ({ page }) => {
			for (const path of ["/", "/gallery"]) {
				await page.goto(path);
				// Through the CSSOM: the app's CSP blocks injected <style> tags.
				await page.evaluate(() => {
					document.documentElement.style.setProperty("font-size", "310%", "important");
				});
				const overflow = await page.evaluate(
					() => document.documentElement.scrollWidth - document.documentElement.clientWidth,
				);
				expect(overflow, `${path} scrolls sideways at 310% text`).toBeLessThanOrEqual(1);
			}
		},
	);
});
