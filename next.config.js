module.exports = {
  webpack: (config, { defaultLoaders, webpack }) => {
    // config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))

    config.module.rules.push({
      test: /\.graphql$/,
      exclude: /node_modules/,
      use: [
        defaultLoaders.babel,
        { loader: 'graphql-let/loader' },
      ],
    })

    config.module.rules.push({
      test: /\.graphqls$/,
      exclude: /node_modules/,
      use: ['graphql-let/schema/loader'],
    })

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    })

    return config
  }
}
