const internalIp = require('internal-ip')
const portFinderSync = require('portfinder-sync')
const path = require('path')
const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { nextTick } = require('process')

const infoColor = (message) => `\u001b[1m\u001b[34m${message}\u001b[39m\u001b[22m`


module.exports = merge(commonConfiguration, {
    mode: 'development',
    devServer: {
        host: 'local-ipv4', // host
        port: portFinderSync.getPort(8080), // port
        static: {
            directory: path.join(__dirname, '../public') // static path
        },
        watchFiles: [path.join(__dirname, '../src/*')], // wathch files modify
        open: true, // open browser
        https: false, // https server
        // hot:false // hot load 
        liveReload: false, // auto reload page on modify files
        onListening(devServer) {
            const port = devServer.server.address().port
            const localIp = internalIp.v4.sync()
            const https = devServer.options.https ? 's' : ''
            const domain = `http${https}://${localIp}:${port}`

            console.log(`\nProject running at:\n  - ${infoColor(domain)}\n`)
        }
    }

})