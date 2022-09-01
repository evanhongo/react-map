module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app"
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  webpackFinal: (config) => {
    const leafletRule = {
      test: /\.js$/,
      include: [ /node_modules\/@react-leaflet/, /node_modules\/react-leaflet/],
      use: [
        {
          loader: 'babel-loader',
          options:{"presets":[["@babel/preset-env",{"modules":"commonjs"}]]}
        }
      ]
    }

    config.module.rules.push(leafletRule);

    return config;
  }
}