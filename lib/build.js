// REFERENCE:
// https://github.com/amzn/style-dictionary/blob/master/examples/advanced/custom-transforms/build.js
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

// APPLY THE CONFIGURATION
StyleDictionaryExtended = StyleDictionary.extend('./tokens/config.json');

// BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();

console.log('\nBuild completed!');
