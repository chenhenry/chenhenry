/*
 * Config
 */

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    devtool: 'source-map',

    debug: true, // Remove for Production

    // Loaders
    module: {
        loaders: [
			{ test: /\.ts$/, loader: 'ts-loader' },
            { test: /\.html$/, loader: 'raw-loader' },
			{ test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!less-loader?sourceMap") },
			{ test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader?sourceMap")},
			{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")},
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=8192&minetype=application/font-woff&name=fonts/[name].[hash].[ext]" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=fonts/[name].[hash].[ext]" },
			{ test: /\.(jpg|jpeg|png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=4096&name=images/[name].[hash].[ext]" }
        ]
    },

    plugins: [
        new ExtractTextPlugin('[name].css'),        
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new CopyWebpackPlugin([{from: 'src/public'}])
    ],

    // Entry
    entry: {
        'vendors': path.join(__dirname, '/src/app/common/vendors.ts'),
        'app': path.join(__dirname, '/src/app/common/app.ts'),
		'locales': path.join(__dirname, '/src/app/common/locales.ts')
    },

    // Resolve Paths
    resolve: {
        root: path.join(__dirname, '/src/app'),
		extensions: ['', '.ts', '.js'],
        alias:
        {
            components: 'common/components',
			modules: 'modules',
            services: 'common/services'
        }
    },
	
	//Fix for node fs module
	node: {
		fs: "empty"
	},

    // Output
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        chunkFilename: '[id].chunk.js'
    },

    // Webpack Development Server
    devServer: {
        contentBase: path.join(__dirname, '/src/public'),
        host: 'localhost',
        watch: true
    }
};