const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');


const config = (env, argv) => {
    console.log(`argv.mode: ${argv.mode}`)

    const backend_url = argv.mode === 'production'
    ? 'https://notes2023.fly.dev/api/notes'
    : 'http://localhost:3001/notes'

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'main.js'
        },
        devServer: {
            static: path.resolve(__dirname, 'build'),
            compress: true,
            port: 3000,
        },
        devtool: 'source-map',
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin({
                // Các tùy chọn tùy chỉnh cho Terser nếu bạn muốn
            })],

            // splitChunks: {
            //     chunks: 'all',
            //     minSize: 20000,
            //     maxSize: 0,
            //     minChunks: 1,
            //     maxAsyncRequests: 30,
            //     maxInitialRequests: 30,
            //     automaticNameDelimiter: '~',
            //     enforceSizeThreshold: 50000,
            //     cacheGroups: {
            //       defaultVendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         priority: -10,
            //         reuseExistingChunk: true,
            //       },
            //       default: {
            //         minChunks: 2,
            //         priority: -20,
            //         reuseExistingChunk: true,
            //       },
            //     },
            //   },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                },

                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
            ],
        },

        plugins: [
            new webpack.DefinePlugin({
                BACKEND_URL: JSON.stringify(backend_url)
            })
        ]
    }
}

module.exports = config