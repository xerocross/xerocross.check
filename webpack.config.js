const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [{
    entry : {
        'checklist-app' : './src/checklist-app.js',
        'xerocross.check' : './src/xerocross.check.js'
    },
    output : {
        path : path.resolve(__dirname, './dist'),
        publicPath : '/dist',
        filename : '[name].js',
        library : 'xerocross.check',
        libraryTarget : 'umd',
        umdNamedDefine : true
    },
    externals : {
        vue : "Vue", // remove this line if you want to bundle vue with the script
        jquery : "$"
    },
    module : {
        rules : [
            {
                test : /\.vue$/,
                exclude : /node_modules/,
                loader : 'vue-loader'
            },
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            },
            {
                test : /\.scss$/,
                use : [
                    {
                        loader : 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader : 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader : 'sass-loader' // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    optimization : {
        minimize : true
    },
    plugins : [
        new webpack.DefinePlugin({
            'NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
        }),
        new VueLoaderPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu|en/),
        new BundleAnalyzerPlugin()
    ],
    devServer : {
        contentBase : "./public",
        compress : true,
        port : 9000,
        watchContentBase : true
    }
},
{
    entry : {
        'demoindex' : './src/demoindex.js'
    },
    output : {
        path : path.resolve(__dirname, './dist'),
        publicPath : '/dist',
        filename : '[name].js',
    },
    externals : {
        jquery : "$"
    },
    module : {
        rules : [
            {
                test : /\.vue$/,
                exclude : /node_modules/,
                loader : 'vue-loader'
            },
            {
                test : /\.js$/,
                exclude : /node_modules/,
                use : {
                    loader : 'babel-loader'
                }
            },
            {
                test : /\.scss$/,
                use : [
                    {
                        loader : 'style-loader' // creates style nodes from JS strings
                    },
                    {
                        loader : 'css-loader' // translates CSS into CommonJS
                    },
                    {
                        loader : 'sass-loader' // compiles Sass to CSS
                    }
                ]
            }
        ]
    },
    optimization : {
        minimize : false
    },
    plugins : [
        new webpack.DefinePlugin({
            'NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
        }),
        new VueLoaderPlugin()
    ],
    devServer : {
        contentBase : "./public",
        compress : true,
        port : 9000,
        watchContentBase : true
    }
}
]