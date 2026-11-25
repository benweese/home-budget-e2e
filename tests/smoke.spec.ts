import { expect, test } from "@playwright/test";

test.describe("smoke", { tag: "@smoke" }, () => {
	test("#0001 home shows the app name, the page heading and a working connection", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle("Budget Ben");
		await expect(page.getByRole("heading", { level: 1, name: "Home" })).toBeVisible();
		await expect(page.getByRole("status")).toHaveText("Connected");
	});

	test("#0002 the skip link moves focus to the main content", async ({ page }) => {
		await page.goto("/");
		await page.keyboard.press("Tab");
		const skip = page.getByRole("link", { name: "Skip to main content" });
		await expect(skip).toBeFocused();
		await page.keyboard.press("Enter");
		await expect(page.getByRole("main")).toBeFocused();
	});

	test("#0003 an unknown path still opens the app", async ({ page }) => {
		const response = await page.goto("/some/unknown/page");
		expect(response?.status()).toBe(200);
		await expect(page.getByRole("heading", { level: 1, name: "Home" })).toBeVisible();
	});

	test("#0004 gallery: Save counts presses; the unavailable button explains why", async ({ page }) => {
		await page.goto("/gallery");
		await page.getByRole("button", { name: "Save" }).click();
		await expect(page.getByText("Pressed 1 times.")).toBeVisible();
		const addIt = page.getByRole("button", { name: "Add it" });
		await expect(addIt).toHaveAttribute("aria-disabled", "true");
		await expect(addIt).toHaveAccessibleDescription("Fill in a name first.");
	});

	test("#0005 pages are served with the security headers", async ({ request }) => {
		const response = await request.get("/");
		const headers = response.headers();
		expect(headers["content-security-policy"]).toContain("default-src 'self'");
		expect(headers["x-content-type-options"]).toBe("nosniff");
		const api = await request.get("/api/health");
		expect(await api.json()).toEqual({ status: "ok" });
	});
});
