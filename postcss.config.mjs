const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      stage: 2,
      features: {
        "cascade-layers": true,
      },
    },
  },
};

export default config;
