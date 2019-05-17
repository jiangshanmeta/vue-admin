module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/base',
        'plugin:vue/essential',
        'plugin:vue/strongly-recommended',
        'plugin:vue/recommended',
        // '@vue/standard',
    ],
    rules: {
        'indent': [
            'error', 4,
        ],
        'comma-dangle': [
            'error', 'always',
        ],
        'vue/html-indent': [
            'error', 4,
        ],
        'array-bracket-newline': [
            'error', 'always',
        ],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
}
