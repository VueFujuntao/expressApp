import express from "express";
import render from "./../common/utils.js";


const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		render(res, 'search', { title: '搜索页面' });
	} catch (e) {
		next(e);
	}
});

export default router;