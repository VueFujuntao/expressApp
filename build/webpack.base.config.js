const webpack = require('webpack');
const {
	resolve
} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const clientConfig = {
	output: {
		path: resolve(__dirname, '..', 'dist'),
		filename: `js/[name].[chunkhash]..js`,
		publicPath: '/'
	},
	module: {
		rules: [{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						attrs: ['img:src', 'img:data-src', ':data-background']
					}
				}]
			},
			{
				test: /\.ejs$/,
				use: [{
						loader: 'html-loader',
						options: {
							attrs: ['img:src', 'img:data-src', ':data-background']
						}
					},
					{
						loader: 'ejs-html-loader',
						options: {
							production: false,
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'views/index.ejs',
			template: "!!raw-loader!" + resolve(__dirname, '..', 'src/views/index.ejs'),
		}),
	]
}

const serverConfig  = {
	target: 'node',
	entry: resolve(__dirname, '..', 'app/bin/www.js'),
	output: {
		path: resolve(__dirname, '..', 'dist'),
	}
}

module.exports = [clientConfig, serverConfig];
