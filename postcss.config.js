module.exports = {
  plugins: {
    autoprefixer: { browsers: 'last 2 versions, ie > 10, safari >= 9' },
    cssnano: process.env.NODE_ENV === 'production',
  },
};
