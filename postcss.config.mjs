const config = {
  plugins: {
    'postcss-preset-env': {
      features: {
        'color-function': true,
      },
    },
    "@tailwindcss/postcss": {},
  },
};

export default config;
