import axios from "axios";
import "@/style/index.scss";
import lodash from "lodash";
import jQuery from "jquery";

if (process.env.NODE_ENV === 'development') {
	require('!!raw-loader!../views/index.ejs');
}

console.log(process.env.NODE_ENV);
const a = 11211;
console.log(a);

let abc = new Promise(() => {
	console.log(123123);
});
console.log(abc)
console.log(abc)
console.log(abc)
console.log(abc)
console.log(abc)
console.log(abc)
console.log(abc)
console.log(abc)
console.log(abc)
class Test {}
class Demo {}

if (module.hot) {
	module.hot.accept();
	
	module.hot.dispose(() => {
		console.log('dispose')
		const href = window.location.href;
		axios.get(href).then(res => {
			const template = res.data;
			// document.open();
			// document.write(template);
			// document.close();
		}).catch(e => {
			console.error(e);
		});
	});
}