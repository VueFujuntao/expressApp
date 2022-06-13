import axios from "axios";

if (process.env.NODE_ENV === 'development') {
	require('!!raw-loader!../views/search.ejs');
}

if (module.hot) {
	module.hot.accept();
	
	module.hot.dispose(() => {
		const href = window.location.href;
		axios.get(href).then(res => {
			const template = res.data;
			document.body.innerHTML = template;
		}).catch(e => {
			console.error(e);
		});
	});
}