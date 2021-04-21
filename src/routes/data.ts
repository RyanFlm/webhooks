import { Router } from 'express';
import * as proxy from 'express-http-proxy';

const router = Router();

router.use('/', proxy(process.env.PROXY_DATA_URL));

export default router;
