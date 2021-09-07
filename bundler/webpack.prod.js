const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')


module.exports = merge(commonConfiguration, {
    mode: 'production',
    module:{
        rules:[
            {
                test: /\.(css)$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin()
    ]
})