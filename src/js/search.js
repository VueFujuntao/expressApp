import axios from "axios";
import "@/style/search.scss";

if (process.env.NODE_ENV === 'development') {
	require('!!raw-loader!../views/search.ejs');
}

class Search {
	sayname() {
		return 'name'
	  }
};

function single() {
	return new Promise((resolve, reject) => {
		try {
			resolve()
		} catch (error) {
			reject()
		}
	});
}

async function Demo() {
	console.log([1,2,3,4,5].includes(2))
	console.log(123123);
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