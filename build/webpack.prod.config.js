const webpack = require('webpack')
const {
	merge
} = require('webpack-merge');
const {
	resolve
} = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const [clientConfig, serverConfig] = require('./webpack.base.config');

const clientProdConfig = merge(clientConfig, {
	mode: 'production',
	entry: {
		index: resolve(__dirname, '..', 'src/js/index.js'),
		search: resolve(__dirname, '..', 'src/js/search.js'),
	},
	plugins: [
		new webpack.BannerPlugin({
			banner: '/*! 最终版权归 小可爱 所有 */',
			raw: true,
		}),
		new MiniCssExtractPlugin({
			filename: `css/[name].css`
		}),
		new HtmlWebpackPlugin({
			filename: 'views/index.ejs',
			template: "!!raw-loader!" + resolve(__dirname, '..', 'src/views/index.ejs'),
			chunks: ['index', 'manifest', 'vendors']
		}),
		new HtmlWebpackPlugin({
			filename: 'views/search.ejs',
			template: "!!raw-loader!" + resolve(__dirname, '..', 'src/views/search.ejs'),
			chunks: ['search', 'manifest', 'vendors']
		}),
	],
	module: {
		rules: [{
			test: /\.css$/,
			exclude: /(node_modules)/,
			include: resolve(__dirname, '..', 'src/style/'),
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								[
									'autoprefixer',
									{
										"overrideBrowserslist": [
											"defaults",
											"not ie < 11",
											"last 3 versions",
											"> 0.2%",
											"iOS 7",
											"last 3 iOS versions"
										]
									}
								]
							]
						}
					}
				}
			]
		}, {
			test: /\.scss$/i,
			exclude: /(node_modules)/,
			include: resolve(__dirname, '..', 'src/style/'),
			use: [
				MiniCssExtractPlugin.loader,
				"css-loader",
				{
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								[
									'autoprefixer',
									{
										"overrideBrowserslist": [
											"defaults",
											"not ie < 11",
											"last 3 versions",
											"> 0.2%",
											"iOS 7",
											"last 3 iOS versions"
										]
									}
								]
							]
						}
					}
				},
				"sass-loader"
			]
		}]
	},
	optimization: {
		minimize: false,
		runtimeChunk: {
			name: 'manifest'
		},
		splitChunks: {
			chunks: "all",
			minChunks: 1, 
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					reuseExistingChunk: true,
					filename: 'js/vendors.js',
				},
			}
		}
	}
});

const serverProdConfig = merge(serverConfig, {
	optimization: {
		minimize: false
	},
});

module.exports = [clientProdConfig, serverProdConfig];
