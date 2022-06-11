import express from "express";
import path from "path";
import indexRouter from "./routes/index";

const app = express();

if (process.env.NODE_ENV === 'development') {

	(async () => {
		let webpack = await import('webpack');
		webpack = webpack.default;

		let webpackDevMiddleware = await import('webpack-dev-middleware');
		webpackDevMiddleware = webpackDevMiddleware.default;

		let webpackHotMiddleware = await import('webpack-hot-middleware');
		webpackHotMiddleware = webpackHotMiddleware.default;

		let webpackConfig = await import('../build/webpack.dev.config');
		webpackConfig = webpackConfig.default;

		const compiler = webpack(webpackConfig);
		compiler.watch({}, () => {
			console.log('监听')
		});

		app.use(webpackDevMiddleware(compiler, {
			publicPath: '/',
		}));

		app.use(webpackHotMiddleware(compiler, {
			publicPath: '/',
			noInfo: true,
		}));
	})();

} else {
	app.set('views', path.join(__dirname, '..', `dist/views/`));
	app.set('view engine', 'ejs');
	app.use(express.static(path.join(__dirname, `..`, 'dist/')));
}

app.use('/', indexRouter);

export default app;
