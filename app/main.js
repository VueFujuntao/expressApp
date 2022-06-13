import express from "express";
import path from "path";

const app = express();

if (process.env.NODE_ENV === 'production') {
	app.set('views', path.join(__dirname, '..', `dist/views/`));
	app.set('view engine', 'ejs');
	app.use(express.static(path.join(__dirname, `..`, 'dist/')));
} else {
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
			console.log('监听');
		});
		
		app.use(webpackDevMiddleware(compiler, {
			publicPath: '/',
		}));

		app.use(webpackHotMiddleware(compiler, {
			publicPath: '/',
			noInfo: true,
		}));
	})();
}

import indexRouter from "./routes/index";
import searchRouter from "./routes/search";
import courseAudioRouter from "./routes/course/audio";
import courseVideoRouter from "./routes/course/video";
import courseColumnRouter from "./routes/course/column";
import courseGraphicRouter from "./routes/course/graphic";

app.use('/', indexRouter);
app.use('/search', searchRouter);
app.use('/course/audio', courseAudioRouter);
app.use('/course/video', courseVideoRouter);
app.use('/course/column', courseColumnRouter);
app.use('/course/graphic', courseGraphicRouter);

export default app;
