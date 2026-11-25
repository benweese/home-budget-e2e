import { expect, test } from "@playwright/test";

const expected: Record<string, number> = { iphone: 1, ipad: 2, desktop: 3 };

test.describe("layout", { tag: "@layout" }, () => {
	test("#0010 the grid has 1 column on iPhone, 2 on iPad, 3 on desktop", async ({ page }, testInfo) => {
		const columns = expected[testInfo.project.name];
		expect(columns, `no expected column count for project ${testInfo.project.name}`).toBeDefined();
		await page.goto("/");
		const tracks = await page
			.getByRole("main")
			.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(" ").filter(Boolean).length);
		expect(tracks).toBe(columns);
	});
});
