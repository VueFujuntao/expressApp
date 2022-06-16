// import lodash from "lodash";
// import jQuery from "jquery";
// import axios from "axios";
import "@/style/index.scss";

if (process.env.NODE_ENV === 'development') {
	require('!!raw-loader!../views/index.ejs');
}

const a = 11211;
const b = 11211;
console.log(a);
console.log(a);
console.log(b);

class Test {}

if (module.hot) {
	module.hot.accept();
	
	module.hot.dispose(() => {
		const href = window.location.href;
		
		axios.get(href).then(res => {
			const html = jQuery('html')[0];
			html.innerHTML = res.data;
		}).catch(e => {
			console.error(e);
		});
	});
}