const webpack = require('webpack')
const {merge} = require('webpack-merge');
const { resolve } = require('path');

const webpackBaseConfig = require('./webpack.base.config');


module.exports = merge(webpackBaseConfig, {
	mode: 'production',
	entry: {
		index: resolve(__dirname, '..', 'src/js/index.js')
	},
	plugins: [
		 new webpack.BannerPlugin({
			 banner: '/*! 最终版权归 小可爱 所有 */',
			 raw: true,
		 })
	]
});
