const webpack = require('webpack')
const {
	merge
} = require('webpack-merge');
const {
	resolve
} = require('path');
const glob = require('glob');

const [clientConfig]  = require('./webpack.base.config');

module.exports = merge(clientConfig, {
	mode: 'development',
	entry: {
		index: [
			resolve(__dirname, '..', 'src/js/index.js'), 'webpack-hot-middleware/client?reload=true'
		],
		search: [
			resolve(__dirname, '..', 'src/js/search.js'), 'webpack-hot-middleware/client?reload=true'
		]
	},
	// entry: ((filepathList) => {
	// 	let entry = {}
	// 	filepathList.forEach(filepath => {
	// 		const list = filepath.split(/[\/|\/\/|\\|\\\\]/g) // eslint-disable-line
	// 		const key = list[list.length - 1].replace(/\.js/g, '')
	// 		// 如果是开发环境，才需要引入 hot module
	// 		entry[key] = isDev ? [filepath, 'webpack-hot-middleware/client?reload=true'] : filepath
	// 	})
	// 	return entry;
	// })(glob.sync(resolve(__dirname, '..', 'src/js/*.js'))),
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /(node_modules)/,
				include: resolve(__dirname, '..', 'src/style/'),
				use: [
					'style-loader',
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
			},
			{
				test: /\.scss$/,
				exclude: /(node_modules)/,
				include: resolve(__dirname, '..', 'src/style/'),
				use: [
					'style-loader',
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
					},
					"sass-loader"
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
	devtool: 'eval-source-map',
});
