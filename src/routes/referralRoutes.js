import express from 'express';
import { submitReferral } from '../controllers/referralController.js';

const router = express.Router();

router.post('/', submitReferral);

export default router;