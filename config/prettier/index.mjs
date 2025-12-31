/** @type {import('prettier').Config} */
const config = {
    plugins: [require('prettier-plugin-tailwindcss')],
    printWidth: 80, // max line length
    tabWidth: 4, // use 4 spaces for indentation
    useTabs: false,
    semi: false, // add semicolons at the end of statements
    singleQuote: true, // use single quotes instead of double quotes
    quoteProps: 'as-needed', // use single quotes instead of double quotes
    jsxSingleQuote: false, // use single quotes instead of double quotes
    trailingComma: 'es5', // do not add trailing commas
    bracketSpacing: true, // do not add spaces inside brackets
    arrowParens: 'always', // do not add parentheses around single arguments
    endOfLine: 'auto', // use the system's line ending
    bracketSameLine: false, // do not add spaces inside brackets
    htmlWhitespaceSensitivity: 'ignore', // ignore whitespace sensitivity in HTML
    
};

export default config;
