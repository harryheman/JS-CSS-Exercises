const HtmlWebpackPlugin = require('html-webpack-plugin') 
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin 
const path = require('path') 
const webpack = require('webpack') 
const CompressionPlugin = require('compression-webpack-plugin') 
const CopyPlugin = require('copy-webpack-plugin') 
const { jsonBeautify } = require('beautify-json') 

let config = {
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: '/',
        filename: 'bundle.js',
    }, 
    resolve: { 
        modules: [path.join(__dirname, 'src'), 'node_modules'], 
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'), 
        }, 
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/, 
                use: {
                    loader: 'babel-loader', 
                }, 
            }, 
            {
                test: /\.css$/, 
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                ],
            }, 
            {
                test: /\.less$/, 
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader'
                    },
                ],
            }, 
            {
                test: /.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    }, 
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',  
            favicon: './favicon.png',
        }),
    ],
}

module.exports = (env, argv) => {
    config.mode = argv.mode 
    if (argv.mode === 'development') {
        config.entry = ['react-hot-loader/patch', './src']
        config.devtool = 'inline-source-map'
        config.resolve.alias['react-dom'] = '@hot-loader/react-dom'
        config.plugins.push(new webpack.HotModuleReplacementPlugin())
        config.devServer = {
            compress: true, 
            hot: true, 
            contentBase: './build', 
            historyApiFallback: true,
        }
    }

    if (argv.mode === 'production') {
        config.entry = ['./src']
        config.devtool = 'source-map'
        config.output.filename = '[name].[chunkhash].bundle.js' 
        config.output.chunkFilename = '[name].[chunkhash].bundle.js'
        config.optimization = {
            moduleIds: 'hashed', 
            runtimeChunk: {
                name: 'manifest',
            }, 
            splitChunks: {
                cacheGroups: {
                    vendors: {
                        test: /node_modules\/(?!antd\/).*/, 
                        name: 'vendors', 
                        chunks: 'all',
                    }, 
                    antd: {
                        test: /node_modules\/(antd\/).*/, 
                        name: 'antd', 
                        chunks: 'all', 
                    }, 
                }, 
            },
        }
        config.plugins.push(
            new BundleAnalyzerPlugin({
                analyzerMode: 'static', 
            }), 
            new CompressionPlugin({
                test: /\.js(\?.*)?$/i, 
            }), 
            new CopyPlugin({
                patterns: [
                    { from: './_redirects' }, 
                ], 
            })
        )
        config.perfomance = {
            hints: 'warnings', 
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js.gz') 
            }, 
        }
    }
    console.log('config') 

    jsonBeautify(config)

    return config 
}