import axios from "axios";
import ejs from "ejs";

async function getTemplateString(filename) {
	try{
		const  res = await axios.get(`http://localhost:8080/views/${filename}`);
		return Promise.resolve(res.data);
	}catch(e){
		return Promise.reject(e);
	}
}

async function render(res, filename, data) {
	const ext = '.ejs';
	filename = filename.indexOf(ext) > -1 ? filename.split(ext)[0] : filename;
	try {
		if (process.env.NODE_ENV === 'development') {
			const template = await getTemplateString(`${filename}.ejs`);
			let html = ejs.render(template, data);
			res.send(html);
		} else {
			res.render(filename, data);
		}
		return Promise.resolve()
	} catch (e) {
		return Promise.reject(e)
	}
}

export {
	getTemplateString,
	render
}
