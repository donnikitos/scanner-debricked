module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:prettier/recommended',
		'@vue/prettier',
	],
	parserOptions: {
		parser: 'babel-eslint',
	},
	rules: {
		'prettier/prettier': [
			'error',
			{ singleQuote: true, useTabs: true, printWidth: 80 },
		],
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
	},
};
