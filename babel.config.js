module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@interfaces': './src/interfaces',
          '@navigator': './src/navigator',
          '@services': './src/services',
          '@utils': './src/utils',
          '@store': './src/store',
        },
        extensions: [
          '.js',
          '.jsx',
          '.tsx',
          '.ts',
          '.ios.js',
          '.android.js',
          '.json',
        ],
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
