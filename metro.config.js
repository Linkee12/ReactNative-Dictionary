const { getDefaultConfig } = require('@expo/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// SVG support
defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer/expo");

defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== "svg");
defaultConfig.resolver.sourceExts = [
  ...defaultConfig.resolver.sourceExts,
  "svg",
  "cjs"
];

module.exports = wrapWithReanimatedMetroConfig(defaultConfig);
