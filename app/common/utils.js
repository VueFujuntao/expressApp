import axios from "axios";

async function getTemplateString(filename) {
	try{
		const  res = await axios.get(`http://localhost:8080/views/${filename}`);
		return Promise.resolve(res.data);
	}catch(e){
		return Promise.reject(e);
	}
}

const render = async function(res, filename, data) {
	const ext = '.ejs';
	filename = filename.indexOf(ext) > -1 ? filename.split(ext)[0] : filename;
	try {
		if (process.env.NODE_ENV === 'development') {
			const ejs = await import('ejs');
			const template = await getTemplateString(`${filename}.ejs`);
			const html = ejs.render(template, data);
			res.send(html);
		} else {
			res.render(filename, data);
		}
		return Promise.resolve();
	} catch (e) {
		return Promise.reject(e)
	}
}

export default render;
