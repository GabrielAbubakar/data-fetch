const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable package exports support
config.resolver.unstable_enablePackageExports = true;

// Add support for .mjs and .cjs extensions which are used by modern packages
config.resolver.sourceExts.push('mjs');
config.resolver.sourceExts.push('cjs');

module.exports = config;
