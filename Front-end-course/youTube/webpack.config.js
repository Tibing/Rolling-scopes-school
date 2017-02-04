const path = require('path');
const Webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;

const config = {
    entry: './js/index.js',
    output: {
        path: path.join(__dirname, './public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    },
    module: {
	  loaders: [
	    {
	      test: /\.js$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['es2015']
	      }
	    }
	  ]
	},
    devtool: NODE_ENV === 'production' ? '' : 'source-map',

};

module.exports = config;