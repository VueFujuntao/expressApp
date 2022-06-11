const webpack = require('webpack')
const {
	merge
} = require('webpack-merge');
const {
	resolve
} = require('path');

const webpackBaseConfig = require('./webpack.base.config');

module.exports = merge(webpackBaseConfig, {
	mode: 'development',
	entry: {
		index: [
			resolve(__dirname, '..', 'src/js/index.js'), 'webpack-hot-middleware/client?reload=true'
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	]
});
