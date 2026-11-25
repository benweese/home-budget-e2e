import AxeBuilder from "@axe-core/playwright";
import { expectNoA11yViolations } from "@benweese/playwright-test-commons";
import { expect, test } from "@playwright/test";

test.describe("accessibility", { tag: "@a11y" }, () => {
	for (const path of ["/", "/gallery"]) {
		test(`#0006 no automated violations on ${path} (WCAG 2.0–2.2 A + AA)`, async ({ page }) => {
			await page.goto(path);
			await expect(page.getByRole("main")).toBeVisible();
			await expectNoA11yViolations(page);
		});
	}

	test(
		"#0007 forced colours: no violations besides colour contrast",
		{ tag: "@desktop-only" },
		async ({ page }) => {
			await page.emulateMedia({ forcedColors: "active" });
			for (const path of ["/", "/gallery"]) {
				await page.goto(path);
				// axe's colour-contrast rule reads author colours, not the forced system palette Chromium draws.
				const { violations } = await new AxeBuilder({ page }).disableRules(["color-contrast"]).analyze();
				expect(violations.map((v) => `${path}: ${v.id}`)).toEqual([]);
			}
		},
	);
});
