import logger from '../config/logger.js';

export default (err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
};