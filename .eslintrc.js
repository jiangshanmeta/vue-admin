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
        '@vue/standard',
    ],
    rules: {
        indent: [
            'error', 4,
        ],
        'comma-dangle': [
            'error', {
                arrays: 'always',
                objects: 'always',
                imports: 'always',
                exports: 'always',
                functions: 'never',
            },
        ],
        'array-bracket-newline': [
            'error', {
                minItems: 1,
            },
        ],
        'object-curly-newline': [
            'error', {
                minProperties: 1,
            },
        ],
        'object-property-newline': [
            'error', {
                allowAllPropertiesOnSameLine: false,
            },
        ],
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        semi: [
            'error', 'always',
        ],
        'standard/no-callback-literal': 'off',
        camelcase: 'off',
        'vue/html-indent': [
            'error', 4,
        ],
        'vue/prop-name-casing': 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
