const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (!isDev) {
    config.minimizer = [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
  }

  return config
}

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

const cssLoaders = (loader) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true
      }
    },
    'css-loader'
  ]

  if (loader) {
    loaders.push(loader)
  }

  return loaders
}

const babelOpts = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
    plugins: ['@babel/plugin-proposal-class-properties']
  }

  if (preset) {
    opts.presets.push(preset)
  }

  return opts
}

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOpts()
    }
  ]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: './index.html'
      /* minify: {
                collapseWhitespace: !isDev,
            }, */
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.png'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ]

  if (!isDev) {
    base.push(new BundleAnalyzerPlugin())
  }

  return base
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: ['@babel/polyfill', './index.jsx'],
    analytics: './analytics.ts'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devtool: isDev ? 'source-map' : '',
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader')
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOpts('@babel/preset-typescript')
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOpts('@babel/preset-react')
        }
      }
    ]
  }
}
