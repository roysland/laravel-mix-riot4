function riot (entry, output, options) {
    this.webpackConfig({
        module: {
            rules: [
                {
                    test: /\.riot$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: '@riotjs/webpack-loader',
                        options: {
                            hot: true
                        }
                    }]
                }
            ]
        }
    })
    return this.js(entry, output)
}

module.exports = riot;