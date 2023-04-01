// REFERENCE:
// https://github.com/amzn/style-dictionary/blob/master/examples/advanced/custom-transforms/build.js

const fs = require('fs');
const { transform } = require('@divriots/style-dictionary-to-figma');
const StyleDictionary = require('style-dictionary');

console.log('Build started...');

// REGISTER THE CUSTOM TRANSFORMS
StyleDictionary.registerFormat({
    name: 'figmaTokensPlugin',
    formatter: ({ dictionary }) => {
        const transformedTokens = transform(dictionary.tokens, { cleanMeta: true });
        return JSON.stringify(transformedTokens, null, 2);
    },
});

StyleDictionary.registerFilter({
    name: 'isSource',
    matcher: (token) => token.isSource === true,
})

// APPLY THE CONFIGURATION
StyleDictionaryExtended = StyleDictionary.extend('./tokens/config.json');

// BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();

fs.copyFile('./dist/tokens.css', './docs/styles/tokens.css', (err) => {
    if (err) throw err;
    console.log('tokens.css was copied to docs');
});

console.log('\nBuild completed!');
