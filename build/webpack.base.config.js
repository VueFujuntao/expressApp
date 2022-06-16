const {
	resolve
} = require('path');
const fs = require('fs');

const clientConfig = {
	output: {
		path: resolve(__dirname, '..', 'dist'),
		filename: `js/[name]-[chunkhash].js`,
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
							production: process.env.NODE_ENV === 'production',
						}
					}
				]
			}
		]
	},
	plugins: [
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, '..', 'src/assets/')
		}
	}
}

let nodeModules = {};
fs.readdirSync('node_modules')
	.filter((x) => {
		return ['.bin'].indexOf(x) === -1;
	})
	.forEach((mod) => {
		nodeModules[mod] = 'commonjs ' + mod;
	});

const serverConfig = {
	target: 'node',
	entry: resolve(__dirname, '..', 'app/bin/www.js'),
	output: {
		path: resolve(__dirname, '..', 'dist'),
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: [
						[
							'@babel/preset-env', {
								"targets": {
									"node": "current"
								},
							}
						]
					]
				}
			}
		}]
	},
	node: {
		global: true,
		__filename: true,
		__dirname: true,
	},
	externals: nodeModules,
}

module.exports = [clientConfig, serverConfig];
