const webpack = require('webpack')
const {merge} = require('webpack-merge');
const { resolve } = require('path');

const [clientConfig, serverConfig] = require('./webpack.base.config');

const clientProdConfig = merge(clientConfig, {
	mode: 'production',
	entry: {
		index: resolve(__dirname, '..', 'src/js/index.js')
	},
	plugins: [
		new webpack.BannerPlugin({
			 banner: '/*! 最终版权归 小可爱 所有 */',
			 raw: true,
		}),
	]
});

const serverProdConfig = merge(serverConfig, {
	
});

module.exports = [clientProdConfig, serverProdConfig];