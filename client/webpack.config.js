const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: './index.js',
	output: {
		path: path.resolve(__dirname, '..', 'public'),
		filename: 'app.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: path.join(__dirname, 'src'),
				loaders: ['react-hot-loader/webpack', 'babel-loader']
			},
			{
				test: /\.scss$/,
				include: path.join(__dirname, 'src'),
				loader: ExtractTextPlugin.extract('css-loader!sass-loader')
			}
		]
	},
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		host: 'localhost',
		port: 8080,
		proxy: {
			'/socket.io': 'http://localhost:8000',
			ws: true
		}
	},
	plugins: [
		new ExtractTextPlugin({
			filename: './style.css',
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin({
			multiStep: false
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('development'),
			}
		}),
		new HtmlWebpackPlugin({
			template: './index.tpl.html'
		})
	]
};
