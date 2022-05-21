module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint/eslint-plugin'
    ],
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        "prettier"
    ],
    env: {
        node: true,
        jest: true
    },
    rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        "@typescript-eslint/no-inferrable-types": "off",
        "no-var": "error",
        "prettier/prettier": [
            "error",
            {
                "endOfLine": "auto"
            }
        ],
        /*"no-console": [
            "error",
            {
                "allow": [
                    "warn",
                    "error"
                ]
            }
        ],
        "no-debugger": "error",*/
    }
}
