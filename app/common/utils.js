import axios from "axios";
import ejs from "ejs";
import memoryFS from "memory-fs";
import path from "path";

const fs = new memoryFS();

async function getTemplateString(filename) {
	try{
		const distPath = path.resolve(__dirname, '../..', 'dist');
		const content  = fs.readFileSync(path.join(distPath, `/views/${filename}`), 'utf8');
		// const  res = await axios.get(`http://localhost:8080/views/${filename}`);
		return Promise.resolve(content);
	} catch(e) {
		console.log(e);
		return Promise.reject(e);
	}
}

const render = async function(req, res, filename, data) {
	const ext = '.ejs';
	filename = filename.indexOf(ext) > -1 ? filename.split(ext)[0] : filename;
	try {
		if (process.env.NODE_ENV === 'development') {
			const template = await getTemplateString(`${filename}.ejs`);
			const html = ejs.render(template, data);
			console.log(html);
			res.send(html);
		} else {
			res.render(filename, data);
		}
		return Promise.resolve();
	} catch (e) {
		return Promise.reject(e)
	}
}

export  {
	render,
	fs,
};
