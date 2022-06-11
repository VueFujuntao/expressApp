if (process.env.NODE_ENV === 'development') {
	const axios = require('axios');
	require('!!raw-loader!../views/index.ejs');
}
console.log(process.env.NODE_ENV);
const a = 11211;
console.log(a);
console.log(a);


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