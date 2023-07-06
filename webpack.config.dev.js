// dev
const LiveReloadPlugin = require('webpack-livereload-plugin')

module.exports = {
    mode: 'development',
    output: {
        filename: 'gridviz-style-ninja-star.js',
        library: 'gviz-nssty',
        libraryTarget: 'umd',
    },
    plugins: [new LiveReloadPlugin()],
    watch: true,
    devtool: 'inline-source-map',

    experiments: {
        asyncWebAssembly: true,
        //syncWebAssembly: true
    },
}
