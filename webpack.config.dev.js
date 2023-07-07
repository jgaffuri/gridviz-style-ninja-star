// dev
const LiveReloadPlugin = require('webpack-livereload-plugin')
//const meta = require('./package.json')
//console.log(meta)
//https://github.com/d3/d3-shape/blob/main/rollup.config.js
//https://webpack.js.org/configuration/output/#outputglobalobject

//const go = Object.assign({}, ...Object.keys(meta.dependencies || {}).filter(key => /^gridviz-/.test(key)).map(key => ({[key]: "gridviz"})))
//console.log(Object.keys(meta.dependencies || {}).filter(key => key.startsWith("gridviz")).map(key => ({[key]: "gridviz"})))

module.exports = {
    mode: 'development',
    output: {
        filename: 'gridviz-style-ninja-star.js',
        library: 'gviz',
        libraryTarget: 'umd',
        //globalObject: go
    },
    plugins: [new LiveReloadPlugin()],
    watch: true,
    devtool: 'inline-source-map',

    experiments: {
        asyncWebAssembly: true,
        //syncWebAssembly: true
    },
}
