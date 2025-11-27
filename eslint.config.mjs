import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').LinterHzConfig[]} */
export default [
    // Ignore
    {
        ignores: ["node_modules", "dist", "build", "coverage"],
    },

    // JavaScript settings (*.js)
    {
        files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
        languageOptions: {
            sourceType: "commonjs",
            globals: globals.node,
        },
        ...pluginJs.configs.recommended,
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "error",
        },
    },

    // TypeScript settings (*.ts)
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tseslint.parser,
            sourceType: "module",
            globals: globals.node,
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
        },

        rules: {
            ...tseslint.configs.recommended.rules,
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },


    eslintConfigPrettier,
];