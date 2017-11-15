module.exports = {
  plugins: {
    autoprefixer: {
      browsers: [
        'chrome >= 60',
        'safari >= 11',
        'Firefox >= 55',
        'Edge >= 16',
        'iOS >= 11',
        'ChromeAndroid >= 60',
      ],
    },
    cssnano: process.env.NODE_ENV === 'production',
  },
};
