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
const WebpackBar = require('webpackbar');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const [clientConfig, serverConfig] = require('./webpack.base.config');

const clientProdConfig = merge(clientConfig, {
	mode: 'production',
	entry: {
		index: resolve(__dirname, '..', 'src/js/index.js'),
		search: resolve(__dirname, '..', 'src/js/search.js'),
	},
	plugins: [
		new WebpackBar(),
		new webpack.BannerPlugin({
			banner: '/*! 最终版权归 小可爱 所有 */',
			raw: true,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: resolve(__dirname, '..', 'src/static/'),
					to: resolve(__dirname, '..', 'dist/static/'),
				}
			]
		}),
		new MiniCssExtractPlugin({
			filename: `assets/css/[name].css`
		}),
		new HtmlWebpackPlugin({
			filename: 'views/index.ejs',
			template: "!!raw-loader!" + resolve(__dirname, '..', 'src/views/index.ejs'),
			chunks: ['index', 'manifest', 'vendors'],
		}),
		new HtmlWebpackPlugin({
			filename: 'views/search.ejs',
			template: "!!raw-loader!" + resolve(__dirname, '..', 'src/views/search.ejs'),
			chunks: ['search', 'manifest', 'vendors'],
		}),
	],
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: [
				{
					loader: 'thread-loader',
					options: {
						workers: 3,
						workerParallelJobs: 50,
						poolTimeout: 2000,
						poolParallelJobs: 50,
					}
				},
				{
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									"useBuiltIns": "usage",
									"corejs": {
										version: '3.23.0',
										"targets": {
											"chrome": 101,
											"ie": 9
										}
									},
								}
							]
						],
						"plugins": [
							["@babel/plugin-transform-runtime", {
								"corejs": 3,
							}],
							["lodash"]
						]
					}
				}
			]
		}, {
			test: /\.css$/,
			exclude: /(node_modules)/,
			include: resolve(__dirname, '..', 'src/assets/style/'),
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
			include: resolve(__dirname, '..', 'src/assets/style/'),
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
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					minChunks: 1,
					chunks: 'all',
					priority: 100
				},
			}
		}
	}
});

const serverProdConfig = merge(serverConfig, {
	optimization: {
		minimize: false
	},
	plugins: [
		new WebpackBar(),
	]
});

module.exports = [clientProdConfig, serverProdConfig];
