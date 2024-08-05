import express from 'express';
import { signin, singup } from '../controller/auth.js';

const router = express.Router();
router.post(`/singup`, singup);
router.post(`/singin`, signin);

export default router;