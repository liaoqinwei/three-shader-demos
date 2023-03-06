const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
    entry: path.join(__dirname, '../src/main.js'),
    output: {
        filename: 'js/bundler.[contenthash].js',
        path: path.join(__dirname, '../dist')
    },
    devtool: 'source-map',
    infrastructureLogging: {
        colors: true,
        level: 'error',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../public/index.html'),
            filename: 'index.html',
            minify: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname, '../public'),
                    filter(f) {
                        const ignoreFiles = ['../public/index.html']
                        return !ignoreFiles.some(p => path.join(__dirname, p) === path.resolve(f))
                    },
                    info: { minimized: true },
                    noErrorOnMissing: true // ignore error on file not find
                }
            ]
        }),
        new MiniCSSExtractPlugin({ filename: 'css/[name].[contenthash].css' })
    ],
    module: {
        rules: [
            // HTML
            {
                test: /\.(html)$/,
                exclude: [path.join(__dirname, '../public/index.html')],
                use: ['html-loader']
            },
            // JS
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            // Images
            {
                test: /\.(jpg|jpeg|png|gif|svg|)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/images'
                        }
                    }
                ]
            },
            // Fonts
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'assets/fonts'
                        }
                    }
                ]
            },
            // glsl frag 
            {
                test: /\.(vert|frag)$/,
                use: [
                    {
                        loader: 'raw-loader',
                    }
                ]
            },
        ]
    }
}