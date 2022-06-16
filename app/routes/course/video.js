import express from "express";
import {render} from "./../../common/utils.js";

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		render(res, 'index', { title: '首页' });
	} catch (e) {
		next(e);
	}
});

export default router;
