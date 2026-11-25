import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import playwright from "eslint-plugin-playwright";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	{ ignores: ["node_modules/", "playwright-report/", "test-results/"] },
	js.configs.recommended,
	tseslint.configs.strictTypeChecked,
	{ languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } } },
	{ files: ["tests/**/*.ts"], ...playwright.configs["flat/recommended"] },
	{
		files: ["**/*.mjs"],
		extends: [tseslint.configs.disableTypeChecked],
		languageOptions: { globals: globals.node },
	},
	prettier,
);
