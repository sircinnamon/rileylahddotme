module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: [
		'standard',
		'plugin:react/recommended'
	],
	overrides: [
		{
			env: {
				node: true
			},
			files: [
				'.eslintrc.{js,cjs}'
			],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: [
		'react'
	],
	settings: {
		react: {
			version: "detect"
		}
	},
	rules: {
		indent: [
			'error',
			'tab',
			{ SwitchCase: 1 }
		],
		"no-tabs": [
			"error",
			{ allowIndentationTabs: true }
		],
		"linebreak-style": [
			'error',
			'unix'
		],
		quotes: [
			'error',
			'double'
		],
		semi: [
			'error',
			'never'
		]
	}
}
