const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, '..', 'public'),
		filename: 'app.min.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: path.join(__dirname, 'src'),
				loaders: ['babel-loader']
			},
			{
				test: /\.scss$/,
				include: path.join(__dirname, 'src'),
				loader: ExtractTextPlugin.extract('css-loader!postcss-loader!sass-loader')
			},
			{
				test: /\.json$/,
				include: path.join(__dirname, 'src'),
				loader: 'json-loader'
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'style.min.css',
			allChunks: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production'),
			}
		}),
		new HtmlWebpackPlugin({
			template: './index.tpl.html'
		}),
		new CopyWebpackPlugin([
			{ from: 'assets', to: 'assets' }
		]),
		// new webpack.optimize.UglifyJsPlugin({
		// 	compressor: {
		// 		warnings: false
		// 	},
		// 	comments: false,
		// 	sourceMap: false,
		// 	mangle: true,
		// 	minimize: true,
		// })
	]
};
